import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { SidebarItem } from "./SidebarItem.tsx";
import { renderIcon } from "../../utils/iconMapper.tsx";
import { SideItem } from "../../types/SideItemProps.ts";
import { Icons } from "../../utils/icons.tsx";
import { getRoutes } from "../../services/api.ts";
import styles from "./sidebar.module.css";
import Logo from "../../assets/trtLogo.webp";

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [menuData, setMenuData] = useState<SideItem[]>([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const isMainPage = location.pathname === "/anasayfa";

    useEffect(() => {
        const getMenuRoutes = async () => {
            try {
                const data = await getRoutes();

                const formatMenuItems = (items: SideItem[]): SideItem[] => {
                    return items.map((item) => ({
                        ...item,
                        icon: renderIcon(item?.iconName),
                        children: item.children ? formatMenuItems(item.children) : undefined,
                    }));
                };

                const sidebarVisibleItems = data.filter((item) => item.showInSidebar !== false);
                setMenuData(formatMenuItems(sidebarVisibleItems));
            } catch (err) {
                console.error("Veri alınırken bir hata oluştu!", err);
            } finally {
                setLoading(false);
            }
        };

        getMenuRoutes();
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    const effectiveCollapsed = isMainPage || isCollapsed;

    return (
        <aside
            className={`${styles.sidebar} ${isMainPage ? styles.homeSidebar : (isCollapsed ? styles.collapsed : "")
                }`}
        >
            <div className={styles.sidebarHeader}>
                <div className={styles.logoWrapper}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                </div>
                {!isMainPage && (
                    <button
                        onClick={toggleSidebar}
                        className={styles.toggleBtn}
                        title={effectiveCollapsed ? "Menüyü Genişlet" : "Menüyü Daralt"}
                    >
                        {effectiveCollapsed ? (
                            <Icons.MenuExpander />
                        ) : (
                            <Icons.menuCollapser />
                        )}
                    </button>
                )}
            </div>

            {!isMainPage && (
                <nav className={styles.sidebarNav}>
                    {loading ? (
                        <div style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>
                            Menü Yükleniyor...
                        </div>
                    ) : (
                        menuData.map((item) => (
                            <SidebarItem
                                key={item.id}
                                item={item}
                                isCollapsed={effectiveCollapsed}
                            />
                        ))
                    )}
                </nav>
            )}
        </aside>
    );
};