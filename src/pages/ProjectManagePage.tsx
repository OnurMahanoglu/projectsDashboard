import { useState, useEffect } from "react";
import styles from "./projects.module.css";
import Project from "../types/projectInterface";

export const ProjectManagePage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await fetch("http://localhost:3000/projects");
                if (!response.ok) {
                    throw new Error("Proje verileri alınırken bir hata oluştu!");
                }
                const data: Project[] = await response.json();
                setProjects(data);
            } catch (err) {
                console.error("Proje verileri alınırken bir hata oluştu!");
            }
        };
        getProjects();
    }, []);

    const filteredProjects = projects.filter((p) =>
        [p.title, p.description, p.manager].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleDelete = async (id: string) => {
        if (confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
            try {
                await fetch(`http://localhost:3000/projects/${id}`, {
                    method: "DELETE"
                });
            } catch (err) {
                console.error("Proje silinirken bir hata oluştu!");
            }
            setProjects((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;

        const isExisting = projects.some((p) => p.id === editingProject.id);

        try {
            if (isExisting) {
                await fetch(`http://localhost:3000/projects/${editingProject.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editingProject)
                });
            } else {
                await fetch("http://localhost:3000/projects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editingProject)
                });
            }
        } catch (err) {
            console.error("Proje kaydedilirken bir sıkıntı oluştu!");
        }

        setProjects((prev) =>
            isExisting ? prev.map((p) => (p.id === editingProject.id ? editingProject : p))
                : [...prev, editingProject]
        );
        setEditingProject(null);
    };

    const handleAddNew = () => {
        setEditingProject({
            id: `p_${Date.now()}`,
            title: "",
            description: "",
            manager: "",
            budget: "",
            startDate: "",
            finishDate: "",
            status: "Planlama"
        });
    };

    const getStatusBadge = (status: Project["status"]) => {
        switch (status) {
            case "Tamamlandı":
                return <span className={`${styles.badge} ${styles.badgeCompleted}`}>Tamamlandı</span>;
            case "Devam Ediyor":
                return <span className={`${styles.badge} ${styles.badgeActive}`}>Devam Ediyor</span>;
            default:
                return <span className={`${styles.badge} ${styles.badgePending}`}>Planlama</span>;
        }
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
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-search-icon lucide-search">
                                <path d="m21 21-4.34-4.34" />
                                <circle cx="11" cy="11" r="8" />
                            </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-circle-plus-icon lucide-circle-plus">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                        </svg>
                        Yeni Proje Ekle
                    </button>
                </div>
            </div>

            <div className={styles.projectsGrid}>
                {filteredProjects.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
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
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-pencil-icon lucide-pencil">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.5 2.5 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </button>
                            <button className={styles.deleteBtn} onClick={() => handleDelete(project.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-trash-2-icon lucide-trash-2">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" x2="10" y1="11" y2="17" />
                                    <line x1="14" x2="14" y1="11" y2="17" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingProject && (
                <div className={styles.modalOverlay}>
                    <form className={styles.modalContent} onSubmit={handleSave}>
                        <h2 className={styles.modalTitle}>
                            {projects.some((p) => p.id === editingProject.id) ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
                        </h2>

                        <div className={styles.formGroup}>
                            <label>Proje Adı</label>
                            <input
                                type="text"
                                required
                                value={editingProject.title}
                                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Açıklama</label>
                            <textarea
                                rows={2}
                                value={editingProject.description}
                                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Sorumlu Kişi</label>
                            <input
                                type="text"
                                value={editingProject.manager}
                                onChange={(e) => setEditingProject({ ...editingProject, manager: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Bütçe</label>
                            <input
                                type="text"
                                value={editingProject.budget}
                                onChange={(e) => setEditingProject({ ...editingProject, budget: e.target.value })}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Başlangıç Tarihi</label>
                                <input
                                    type="date"
                                    value={editingProject.startDate}
                                    onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Teslim Tarihi</label>
                                <input
                                    type="date"
                                    value={editingProject.finishDate}
                                    onChange={(e) => setEditingProject({ ...editingProject, finishDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Durum</label>
                            <select
                                value={editingProject.status}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, status: e.target.value as Project["status"] })
                                }
                            >
                                <option value="Planlama">Planlama</option>
                                <option value="Devam Ediyor">Devam Ediyor</option>
                                <option value="Tamamlandı">Tamamlandı</option>
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