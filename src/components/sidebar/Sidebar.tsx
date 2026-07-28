import { useState, useEffect } from "react";
import { SidebarItem } from "./SidebarItem.tsx";
import { renderIcon } from "../../utils/iconMapper.tsx";
import { SideItem } from "../../types/SideItemProps.ts";
import styles from "./sidebar.module.css";
import Logo from "../../assets/trt.png"

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [menuData, setMenuData] = useState<SideItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMenuRoutes = async () => {
            try {
                const response = await fetch("http://localhost:3000/routes");

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu!");
                }

                const data: SideItem[] = await response.json();

                const formatMenuItems = (items: SideItem[]): SideItem[] => {
                    return items.map((item) => ({
                        ...item,
                        icon: renderIcon(item?.iconName),
                        children: item.children ? formatMenuItems(item.children) : undefined,
                    }));
                };

                const sidebarViasibleItems = data.filter((item) => item.showInSidebar !== false);
                setMenuData(formatMenuItems(sidebarViasibleItems));
            } catch (err) {
                console.error("Veri alinırken bir hata oluştu!", err);
            } finally {
                setLoading(false);
            }
        };

        getMenuRoutes();
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logoWrapper}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                </div>
                <button
                    onClick={toggleSidebar}
                    className={styles.toggleBtn}
                    title={isCollapsed ? "Menüyü Genişlet" : "Menüyü Daralt"}
                >
                    {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide-panel-right-close"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M15 3v18" />
                            <path d="m8 9 3 3-3 3" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide-panel-right-open"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M15 3v18" />
                            <path d="m10 15-3-3 3-3" />
                        </svg>
                    )}
                </button>
            </div>
            <nav className={styles.sidebarNav}>
                {loading ? (
                    <div style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>
                        Menu Yükleniyor...
                    </div>
                ) : (
                    menuData.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            isCollapsed={isCollapsed}
                        />
                    ))
                )}
            </nav>
        </aside>
    );
};
