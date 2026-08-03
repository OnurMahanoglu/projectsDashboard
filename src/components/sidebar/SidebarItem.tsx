import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Icons } from "../../utils/icons.tsx";
import styles from "./sidebar.module.css";

export const SidebarItem = ({ item, isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const hasChildren = Boolean(item.children && item.children.length > 0);

    const hasActiveChild = hasChildren && item.children?.some(
        (child) =>
            child.path && location.pathname === child.path
    );

    useEffect(() => {
        const isActiveParent = Boolean(
            hasChildren && (
                (item.path && item.path !== "/" && location.pathname.includes(item.path)) ||
                hasActiveChild
            )
        );

        if (isActiveParent) {
            setIsOpen(true);
        }
    }, [hasActiveChild, location.pathname]);

    const handleToggle = () => {
        if (hasChildren) {
            if (isCollapsed) {
                const firstChildPath = item.children?.[0]?.path;
                if (firstChildPath && location.pathname !== firstChildPath) {
                    navigate(firstChildPath);
                }
            } else {
                setIsOpen((prev) => !prev);
            }
        }
    };

    if (hasChildren) {
        return (
            <div className={styles.sidebarItemGroup}>
                <div
                    className={`${styles.sidebarItemHeader} ${hasActiveChild ? styles.parentOfActive : ""}`}
                    onClick={handleToggle}
                >
                    <div className={styles.itemLeft}>
                        {item.icon && <span className={styles.iconWrapper}>{item.icon}</span>}
                        <span className={styles.itemTitle}>{item.title}</span>
                    </div>

                    <div className={styles.itemRight}>
                        {item.badge && <span className={styles.badge}>{item.badge}</span>}
                        <span className={styles.arrow}>
                            {isOpen ? (
                                <Icons.arrowUp />
                            ) : (
                                <Icons.arrowDown />
                            )}
                        </span>
                    </div>
                </div>

                <div className={`${styles.sidebarSubMenuWrapper} ${(isOpen && !isCollapsed) ? styles.open : ""}`}>
                    <div className={styles.sidebarSubMenu}>
                        {item.children?.map((child) => (
                            <NavLink
                                key={child.id}
                                to={child.path || "#"}
                                className={({ isActive }) =>
                                    isActive ? `${styles.sidebarSubItem} ${styles.active}` : styles.sidebarSubItem
                                }
                            >
                                {child.icon && <span className={styles.subIconWrapper}>{child.icon}</span>}
                                <span className={styles.itemTitle}>{child.title}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div >
        );
    }

    return (
        <NavLink
            to={item.path || "#"}
            className={({ isActive }) =>
                isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
        >
            <div className={styles.itemLeft}>
                {item.icon && <span className={styles.iconWrapper}>{item.icon}</span>}
                <span className={styles.itemTitle}>{item.title}</span>
            </div>
            <div className={styles.itemRight}>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </div>
        </NavLink>
    );
};