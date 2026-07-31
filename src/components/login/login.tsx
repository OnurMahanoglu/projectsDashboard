import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, LogIn, ArrowLeft } from "lucide-react";
import trtLogo from "../../assets/trtLogo.webp";
import { KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID } from "../../config/keycloakConfig";
import styles from "./login.module.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");

    if (!username || !password) {
      setError("Lütfen kullanıcı adı ve şifrenizi girin.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "password",
            client_id: KEYCLOAK_CLIENT_ID,
            username: username,
            password: password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Kullanıcı adı veya şifre hatalı.");
      }

      const data = await res.json();

      const payload = JSON.parse(atob(data.access_token.split(".")[1]));
      const roles: string[] = payload.realm_access?.roles ?? [];

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("roles", JSON.stringify(roles));

      navigate("/Anasayfa");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş başarısız oldu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginCard}>
      <img src={trtLogo} alt="TRT" className={styles.loginLogo} />
      <h1 className={styles.loginTitle}>Giriş Yap</h1>

      {error && <div className={styles.loginError}>{error}</div>}

      <div className={styles.loginField}>
        <label>Kullanıcı Adı</label>
        <div className={styles.inputWithIcon}>
          <User size={18} className={styles.inputIcon} />
          <input
            type="text"
            placeholder="kullanici_adi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

      <button className={styles.loginSubmit} onClick={handleLogin} disabled={loading}>
        <LogIn size={18} />
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <button className={styles.loginBack} onClick={() => navigate("/kayit-ol")}>
        Hesabın yok mu? Kayıt Ol
      </button>

      <button className={styles.loginBack} onClick={() => navigate("/")}>
        <ArrowLeft size={16} />
        Ana Sayfaya Dön
      </button>
    </div>
  );
}

export default Login;