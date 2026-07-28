import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import styles from "./sidebar.module.css";
import SideItemProps  from "../../types/SideItemProps.ts";

export const SidebarItem = ({ item, isCollapsed }: SideItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const hasChildren = Boolean(item.children && item.children.length > 0);

    const hasActiveChild = hasChildren && item.children?.some(
        (child) =>
            child.path && location.pathname === child.path
    );

    const handleToggle = () => {
        if (hasChildren && !isCollapsed) {
            setIsOpen((prev) => !prev);
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide-square-arrow-up"
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2" />
                                    <path d="m16 12-4-4-4 4" />
                                    <path d="M12 16V8" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide-square-arrow-down"
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2" />
                                    <path d="M12 8v8" />
                                    <path d="m8 12 4 4 4-4" />
                                </svg>
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