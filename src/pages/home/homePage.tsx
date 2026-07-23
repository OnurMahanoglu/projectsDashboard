import styles from "./homePage.module.css";
import { useNavigate } from "react-router";
import trtLogo from "../../assets/trt-logo.webp"; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeButtonsWrapper}>
      <img src={trtLogo} alt="TRT Logo" className={styles.trtLogo} />
      <div className={styles.homeButtons}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate("/login")}>Giriş Yap</button>
        <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => navigate("/projects")}>Projeler</button>
      </div>
    </div>
  );
}

export default Home;