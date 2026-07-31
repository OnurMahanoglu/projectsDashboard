import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";
import trtLogo from "../../assets/trtLogo.webp";
import { KEYCLOAK_URL, KEYCLOAK_REALM } from "../../config/keycloakConfig";
import styles from "./register.module.css";

interface KeycloakRole {
  id: string;
  name: string;
}

function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Şifre en az 8 karakter olmalı.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Şifre en az 1 büyük harf içermeli.";
  }
  if (!/[a-z]/.test(password)) {
    return "Şifre en az 1 küçük harf içermeli.";
  }
  if (!/[0-9]/.test(password)) {
    return "Şifre en az 1 rakam içermeli.";
  }
  return null;
}

async function getAdminToken(): Promise<string> {
  const tokenRes = await fetch(
    `${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: "admin-cli",
        username: "admin",
        password: "admin",
      }),
    }
  );

  if (!tokenRes.ok) throw new Error("Admin token alınamadı.");

  const tokenData = await tokenRes.json();
  return tokenData.access_token as string;
}

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState<KeycloakRole[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const adminToken = await getAdminToken();

        const rolesRes = await fetch(
          `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/roles`,
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        if (!rolesRes.ok) throw new Error();
        const allRoles: KeycloakRole[] = await rolesRes.json();

        const systemRoles = ["offline_access", "uma_authorization"];
        const filtered = allRoles.filter(
          (r) => !systemRoles.includes(r.name) && !r.name.startsWith("default-roles")
        );

        setRoles(filtered);
      } catch {
        setError("Roller yüklenemedi. Keycloak çalışıyor mu kontrol et.");
      }
    }

    fetchRoles();
  }, []);

  async function handleRegister() {
    setError("");

    if (!username || !email || !password || !passwordConfirm || !roleName) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== passwordConfirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      setLoading(true);

      const adminToken = await getAdminToken();

      const createRes = await fetch(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            username: username,
            email: email,
            enabled: true,
            emailVerified: true,
            requiredActions: [],
            credentials: [{ type: "password", value: password, temporary: false }],
          }),
        }
      );

      if (!createRes.ok) {
        if (createRes.status === 409) {
          throw new Error("Bu kullanıcı adı veya e-posta zaten kullanılıyor.");
        }
        if (createRes.status === 400) {
          throw new Error("Şifre, Keycloak güvenlik politikasına uymuyor.");
        }
        throw new Error("Kayıt işlemi başarısız oldu.");
      }

      const location = createRes.headers.get("Location");
      const userId = location?.split("/").pop();
      if (!userId) throw new Error("Kullanıcı id'si alınamadı.");

      const role = roles.find((r) => r.name === roleName);
      if (!role) throw new Error("Seçilen rol bulunamadı.");

      const assignRes = await fetch(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/realm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify([{ id: role.id, name: role.name }]),
        }
      );
      if (!assignRes.ok) throw new Error("Rol atanamadı.");

      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.registerCard}>
      <img src={trtLogo} alt="TRT" className={styles.registerLogo} />
      <h1 className={styles.registerTitle}>Kayıt Ol</h1>

      {error && <div className={styles.registerError}>{error}</div>}

      <div className={styles.registerField}>
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

      <div className={styles.registerField}>
        <label>Email</label>
        <div className={styles.inputWithIcon}>
          <Mail size={18} className={styles.inputIcon} />
          <input
            type="email"
            placeholder="ad.soyad@trt.net.tr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.registerField}>
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
        <span className={styles.passwordHint}>
          En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam içermeli.
        </span>
      </div>

      <div className={styles.registerField}>
        <label>Şifre Tekrar</label>
        <div className={styles.inputWithIcon}>
          <Lock size={18} className={styles.inputIcon} />
          <input
            type="password"
            placeholder="••••••••"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.registerField}>
        <label>Rol</label>
        <select
          className={styles.roleSelect}
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        >
          <option value="">Rol seçin</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <button className={styles.registerSubmit} onClick={handleRegister} disabled={loading}>
        <UserPlus size={18} />
        {loading ? "Kaydediliyor..." : "Kayıt Ol"}
      </button>

      <button className={styles.registerBack} onClick={() => navigate("/login")}>
        <ArrowLeft size={16} />
        Giriş Sayfasına Dön
      </button>
    </div>
  );
}

export default Register;