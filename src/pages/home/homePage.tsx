import styles from "./homePage.module.css";
import { useNavigate } from "react-router";
import trtLogo from "../../assets/trtLogo.webp";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeButtonsWrapper}>
      <img src={trtLogo} alt="TRT Logo" className={styles.trtLogo} />
      <div className={styles.homeButtons}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate("/giris")}>Giriş Yap</button>
        <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => navigate("/projeler/liste")}>Projeler</button>
      </div>
    </div>
  );
}

export default Home;