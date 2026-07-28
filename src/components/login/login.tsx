import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import trtLogo from "../../assets/trtLogo.webp";
import styles from "./login.module.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("email:", email);
    console.log("şifre:", password);
  }

  return (
    <div className={styles.loginCard}>

      <img src={trtLogo} alt="TRT" className={styles.loginLogo} />

      <h1 className={styles.loginTitle}>Giriş Yap</h1>

      <div className={styles.loginField}>
        <label>Email</label>
        <div className={styles.inputWithIcon}>
          <Mail size={18} className={styles.inputIcon} />
          <input
            type="text"
            placeholder="ad.soyad@trt.net.tr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.loginField}>
        <label>Şifre</label>
        <div className={styles.inputWithIcon}>
          <Lock size={18} className={styles.inputIcon} />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.forgotPassword}>Şifremi Unuttum</button>

      <button className={styles.loginSubmit} onClick={handleLogin}>
        <LogIn size={18} />
        Giriş Yap
      </button>

      <button className={styles.loginBack} onClick={() => navigate("/")}>
        <ArrowLeft size={16} />
        Ana Sayfaya Dön
      </button>

    </div>
  );
}

export default Login;