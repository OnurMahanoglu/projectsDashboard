import { useState } from "react";
import { sidebarData } from "./sidebarData.tsx";
import { SidebarItem } from "./SidebarItem.tsx";
import styles from "./sidebar.module.css";
import Logo from "../../assets/trt.png"

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <aside
            className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
        >
            <div
                className={styles.sidebarHeader}>
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
                {sidebarData.map((item) => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </nav>
        </aside>
    );
};
