
import { Sidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import styles from "./mainLayout.module.css";

export const MainLayout = () => {
    return (
        <div className={styles.layoutContainer}>
            <Sidebar />
            <div className={styles.contentWrapper}>
                <Header />
                <main className={styles.mainContent}>
                    {/* {children} */}
                </main>
            </div>
        </div>
    );
};