import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SideItem } from "../types/SideItemProps";
import { renderIcon } from "../utils/iconMapper.tsx";
import { Icons } from "../utils/icons";
import Project from "../types/projectInterface";
import { getFavoriteIds, setAutoEditProject } from "../utils/storage";
import { getRoutes, getProjects } from "../services/api";
import styles from "./mainPage.module.css";

export const MainPage = () => {
    const [menuData, setMenuData] = useState<SideItem[]>([]);
    const [favProjects, setFavProjects] = useState<Project[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const routesData = await getRoutes();

                const formatMenuItems = (items: SideItem[]): SideItem[] => {
                    return items
                        .filter(
                            (item) =>
                                item.showInSidebar !== false &&
                                item.path !== "/anasayfa" &&
                                item.path !== "/" &&
                                item.title?.toLowerCase() !== "anasayfa"
                        )
                        .map((item) => ({
                            ...item,
                            icon: renderIcon(item?.iconName),
                            children: item.children ? formatMenuItems(item.children) : undefined,
                        }));
                };

                setMenuData(formatMenuItems(routesData));
                const projectsData = await getProjects();
                const savedFavIds = getFavoriteIds();
                setFavProjects(projectsData.filter((p: any) => savedFavIds.includes(p.id)));
            } catch (err) {
                console.error("Verileri alırken bir sıkıntı oluştu: MainPage", err);
            }
        };

        const fetchFavProjects = async () => {
            try {
                const data = await getProjects();
                const savedFavIds = getFavoriteIds();

                const filteredFavs = data.filter((p: any) => savedFavIds.includes(p.id));
                setFavProjects(filteredFavs);
            } catch (err) {
                console.error("Favori projeler alınırken hata oluştu", err);
            }
        };

        fetchRoutes();
        fetchFavProjects();
    }, []);

    const handleCardClick = (item: SideItem) => {
        if (item.children && item.children.length > 0) {
            const firstChildPath = item.children[0].path;
            if (firstChildPath) {
                navigate(firstChildPath);
            }
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const handleFavProjectClick = (project: Project) => {
        setAutoEditProject(project);
        navigate("/projeler/yonetim");
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.menuGrid}>
                {menuData.map((item) => (
                    <div key={item.id} className={styles.menuCard} onClick={() => handleCardClick(item)}>
                        <div className={styles.iconBox}>{item.icon}</div>
                        <div className={styles.cardInfo}>
                            <h3>{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.shortcutSection}>
                <div className={styles.sectionHeader}>
                    <h2>Proje Kısayolları</h2>
                    <p>Hızlı erişim sağlayın veya proje ekleyin.</p>
                </div>

                <div className={styles.favProjectsGrid}>
                    {favProjects.map((project) => (
                        <div
                            key={project.id}
                            className={styles.favProjectCard}
                            onClick={() => handleFavProjectClick(project)}
                        >
                            <div className={styles.favCardHeader}>
                                <h4>{project.title}</h4>
                            </div>
                            <p>{project.description || "Açıklama bulunmuyor."}</p>
                            <div className={styles.favCardFooter}>
                                <span>Sorumlu: {project.manager || "-"}</span>
                            </div>
                        </div>
                    ))}

                    <div
                        className={styles.addProjectCard}
                        onClick={() => {
                            navigate("/projeler/yonetim");
                        }}
                    >
                        <div className={styles.addIconBox}>
  {/* @ts-ignore */}
  <Icons.PlusCircle />
</div>

                        <span>Proje Kısayolu Ekle</span>
                    </div>
                </div>
            </div>
        </div>
    );
};