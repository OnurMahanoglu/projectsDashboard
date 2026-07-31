import { useState, useEffect } from "react";
import styles from "./projects.module.css";
import Project from "../types/projectInterface";
import { ProjectStatus } from "../enum/ProjectEnum";
import { Icons } from "../utils/icons";
import { getFavoriteIds, getAutoEditProject, clearAutoEditProject } from "../utils/storage";
import { getProjects, createProject, updateProject, deleteProject } from "../services/api";

export const ProjectManagePage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [favoriteIds, setFavoriteIds] = useState<string[]>(getFavoriteIds());

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);

                const savedProject = getAutoEditProject();
                if (savedProject) {
                    setEditingProject(savedProject);

                    clearAutoEditProject();
                }
            } catch (err) {
                console.error("Proje verileri alınırken bir hata oluştu!");
            }
        };
        fetchProjects();
    }, []);

    const toggleFavorite = (project: Project, e: React.MouseEvent) => {
        e.stopPropagation();

        let updatedFavs: string[];
        if (favoriteIds.includes(project.id)) {
            updatedFavs = favoriteIds.filter((id) => id !== project.id);
        } else {
            updatedFavs = [...favoriteIds, project.id];
        }

        setFavoriteIds(updatedFavs);
        localStorage.setItem("favoriteProjectIds", JSON.stringify(updatedFavs));
    };

    const filteredProjects = projects.filter((p) =>
        [p.title, p.description, p.manager].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleDelete = async (id: string) => {
        if (confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
            try {
                await deleteProject(id);

                setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));

            } catch (err) {
                console.error("Proje silinirken bir hata oluştu!");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;

        const isExisting = projects.some((p) => String(p.id) === String(editingProject.id));

        try {
            if (isExisting) {
                const updated = await updateProject(editingProject);
                setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
            } else {
                const created = await createProject(editingProject);
                setProjects((prev) => [...prev, created]);
            }
            setEditingProject(null);
        } catch (err) {
            console.error("Proje kaydedilirken bir hata oluştu!");
        }
    };

    const handleAddNew = () => {
        setEditingProject({
            id: `p_${Date.now()}`,
            title: "",
            status: ProjectStatus.Planlama
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEditingProject((prev) => prev ? { ...prev, [name]: value } : null);
    };

    const getStatusBadge = (status: Project["status"]) => {
        const badgeStyles: Record<ProjectStatus, string> = {
            [ProjectStatus.Tamamlandi]: styles.badgeCompleted,
            [ProjectStatus.DevamEdiyor]: styles.badgeActive,
            [ProjectStatus.Beklemede]: styles.badgePending,
            [ProjectStatus.Planlama]: styles.badgePlanning
        };

        return <span className={`${styles.badge} ${badgeStyles[status]}`}>{status}</span>
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerSection}>
                <div>
                    <h1 className={styles.title}>Proje Yönetimi</h1>
                    <p className={styles.subtitle}>Mevcut projeleri detaylandırın ve güncelleyin.</p>
                </div>

                <div className={styles.actionsGroup}>
                    <div className={styles.searchWrapper}>
                        <span className={styles.searchIcon}>
                            <Icons.Search />
                        </span>
                        <input
                            type="text"
                            placeholder="Proje veya kişi ara..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button className={styles.primaryBtn} onClick={handleAddNew}>
                        <Icons.PlusCircle />
                        Yeni Proje Ekle
                    </button>
                </div>
            </div>

            <div className={styles.projectsGrid}>
                {filteredProjects.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.cardHeader}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <button
                                    className={styles.favBtn}
                                    onClick={(e) => toggleFavorite(project, e)}
                                    title={project.favorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                                >
                                    <Icons.Star isFilled={favoriteIds.includes(project.id)} />
                                </button>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                            </div>
                            {getStatusBadge(project.status)}
                        </div>

                        <p className={styles.projectDesc}>{project.description || "-"}</p>

                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Sorumlu</span>
                                <span className={styles.detailValue}>{project.manager || "-"}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Bütçe</span>
                                <span className={styles.detailValue}>{project.budget || "-"}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Başlangıç</span>
                                <span className={styles.detailValue}>{project.startDate || "-"}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Teslim Tarihi</span>
                                <span className={styles.detailValue}>{project.finishDate || "-"}</span>
                            </div>
                        </div>

                        <div className={styles.cardActions}>
                            <button className={styles.editBtn} onClick={() => setEditingProject(project)}>
                                <Icons.Pencil />
                            </button>
                            <button className={styles.deleteBtn} onClick={() => handleDelete(project.id)}>
                                <Icons.Trash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingProject && (
                <div className={styles.modalOverlay}>
                    <form className={styles.modalContent} onSubmit={handleSubmit}>
                        <h2 className={styles.modalTitle}>
                            {projects.some((p) => p.id === editingProject.id) ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
                        </h2>

                        <div className={styles.formGroup}>
                            <label>Proje Adı</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={editingProject.title || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Açıklama</label>
                            <textarea
                                rows={2}
                                name="description"
                                value={editingProject.description || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Sorumlu Kişi</label>
                            <input
                                type="text"
                                name="manager"
                                value={editingProject.manager || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Bütçe</label>
                            <input
                                type="text"
                                name="budget"
                                value={editingProject.budget || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Başlangıç Tarihi</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={editingProject.startDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Teslim Tarihi</label>
                                <input
                                    type="date"
                                    name="finishDate"
                                    value={editingProject.finishDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Durum</label>
                            <select
                                name="status"
                                value={editingProject.status}
                                onChange={handleChange}
                            >
                                {Object.values(ProjectStatus).map((statusValue) => (
                                    <option key={statusValue} value={statusValue}>
                                        {statusValue}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.modalActions}>
                            <button type="button" className={styles.cancelBtn} onClick={() => setEditingProject(null)}>
                                İptal
                            </button>
                            <button type="submit" className={styles.primaryBtn}>
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};