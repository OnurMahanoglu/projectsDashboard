import styles from "./header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerTitle}>
                <span>Dashboard</span>
            </div>

            <div className={styles.headerRight}>
                <div className={styles.placeholderItem}>Arama</div>
                <div className={styles.placeholderUser}>Profil</div>
            </div>
        </header>
    );
};