import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserCog, Lock, Bell, Camera, User, X } from "lucide-react";
import {
    fetchAccountInfo,
    updateAccountInfo,
    changePassword,
    type KeycloakAccountInfo,
} from "../components/account/accountService";
import styles from "./accountSettings.module.css";

interface ProfileForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const AVATAR_STORAGE_KEY = "accountAvatarPreview";

export const AccountSettingsPage = () => {
    const navigate = useNavigate();

    const [accountInfo, setAccountInfo] = useState<KeycloakAccountInfo | null>(null);

    const [profile, setProfile] = useState<ProfileForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [passwords, setPasswords] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const info = await fetchAccountInfo();
                setAccountInfo(info);
                setProfile({
                    firstName: info.firstName || "",
                    lastName: info.lastName || "",
                    email: info.email || "",
                    phone: info.attributes?.phone?.[0] || "",
                });
            } catch (err) {
                setErrorMsg(err instanceof Error ? err.message : "Bilgiler alınamadı.");
            } finally {
                setLoading(false);
            }
        })();

        const savedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
        // if (savedAvatar) {
        //     setAvatarPreview(savedAvatar);
        // }
    }, []);

    useEffect(() => {
        if (!errorMsg && !successMsg) return;
        const timer = setTimeout(() => {
            setErrorMsg("");
            setSuccessMsg("");
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorMsg, successMsg]);

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setAvatarPreview(result);
            localStorage.setItem(AVATAR_STORAGE_KEY, result);
        };
        reader.readAsDataURL(file);
    };

    const handleProfileChange = (field: keyof ProfileForm, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field: keyof PasswordForm, value: string) => {
        setPasswords((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setErrorMsg("");
        setSuccessMsg("");

        if (!accountInfo) {
            setErrorMsg("Hesap bilgileri henüz yüklenmedi, lütfen bekleyin.");
            return;
        }

        if (passwords.newPassword) {
            if (passwords.newPassword.length < 8) {
                setErrorMsg("Yeni şifre en az 8 karakter olmalı.");
                return;
            }
            if (!/[A-Z]/.test(passwords.newPassword)) {
                setErrorMsg("Yeni şifre en az 1 büyük harf içermeli.");
                return;
            }
            if (!/[a-z]/.test(passwords.newPassword)) {
                setErrorMsg("Yeni şifre en az 1 küçük harf içermeli.");
                return;
            }
            if (!/[0-9]/.test(passwords.newPassword)) {
                setErrorMsg("Yeni şifre en az 1 rakam içermeli.");
                return;
            }
            if (passwords.newPassword !== passwords.newPasswordConfirm) {
                setErrorMsg("Yeni şifreler eşleşmiyor.");
                return;
            }
        }

        try {
            setSaving(true);

            await updateAccountInfo(accountInfo, {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
            });

            setAccountInfo((prev) =>
                prev
                    ? {
                          ...prev,
                          firstName: profile.firstName,
                          lastName: profile.lastName,
                          email: profile.email,
                      }
                    : prev
            );

            if (passwords.newPassword) {
                await changePassword(
                    passwords.currentPassword,
                    passwords.newPassword,
                    passwords.newPasswordConfirm
                );
                setPasswords({ currentPassword: "", newPassword: "", newPasswordConfirm: "" });
            }

            setSuccessMsg("Değişiklikler başarıyla kaydedildi.");
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : "Kaydetme sırasında bir hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className={styles.pageWrapper}>Yükleniyor...</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            {(errorMsg || successMsg) && (
                <div className={errorMsg ? styles.toastError : styles.toastSuccess}>
                    <span>{errorMsg || successMsg}</span>
                    <button
                        type="button"
                        className={styles.toastCloseBtn}
                        onClick={() => {
                            setErrorMsg("");
                            setSuccessMsg("");
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Hesap Ayarları</h1>
                <p className={styles.pageSubtitle}>
                    Kişisel bilgilerinizi ve tercihlerinizi buradan yönetebilirsiniz.
                </p>
            </div>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <UserCog className={styles.cardIcon} size={22} />
                    <h3 className={styles.cardTitle}>Profil Düzenleme</h3>
                </div>

                <div className={styles.profileSection}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>
                            <div className={styles.avatarCircle}>
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Profil fotoğrafı"
                                        className={styles.avatarImage}
                                    />
                                ) : (
                                    <User className={styles.avatarIcon} size={48} />
                                )}
                            </div>
                            <button
                                type="button"
                                className={styles.avatarEditBtn}
                                onClick={handleAvatarClick}
                            >
                                <Camera size={16} />
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleAvatarChange}
                            className={styles.hiddenFileInput}
                        />
                        <span className={styles.avatarHint}>JPG veya PNG, max 5MB</span>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.field}>
                            <label>Ad</label>
                            <input
                                type="text"
                                value={profile.firstName}
                                onChange={(e) => handleProfileChange("firstName", e.target.value)}
                                placeholder="Adınız"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Soyad</label>
                            <input
                                type="text"
                                value={profile.lastName}
                                onChange={(e) => handleProfileChange("lastName", e.target.value)}
                                placeholder="Soyadınız"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>E-posta</label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => handleProfileChange("email", e.target.value)}
                                placeholder="ornek@trt.net.tr"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Telefon</label>
                            <input
                                type="tel"
                                value={profile.phone}
                                onChange={(e) => handleProfileChange("phone", e.target.value)}
                                placeholder="+90 5XX XXX XX XX"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <Lock className={styles.cardIcon} size={22} />
                    <h3 className={styles.cardTitle}>Şifre İşlemleri</h3>
                </div>

                <div className={styles.formGridThree}>
                    <div className={styles.field}>
                        <label>Mevcut Şifre</label>
                        <input
                            type="password"
                            value={passwords.currentPassword}
                            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Yeni Şifre</label>
                        <input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                            placeholder="Yeni şifre belirleyin"
                        />
                        <span className={styles.passwordHint}>
                            En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam
                        </span>
                    </div>
                    <div className={styles.field}>
                        <label>Yeni Şifre Tekrar</label>
                        <input
                            type="password"
                            value={passwords.newPasswordConfirm}
                            onChange={(e) => handlePasswordChange("newPasswordConfirm", e.target.value)}
                            placeholder="Yeni şifreyi onaylayın"
                        />
                    </div>
                </div>
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <Bell className={styles.cardIcon} size={22} />
                    <h3 className={styles.cardTitle}>Bildirim Tercihleri</h3>
                </div>

                <div className={styles.notifRow}>
                    <div>
                        <h4>E-posta Bildirimleri</h4>
                        <p>Yeni projeler ve sistem güncellemeleri hakkında e-posta al.</p>
                    </div>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) =>
                                setNotifications((prev) => ({ ...prev, email: e.target.checked }))
                            }
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.notifRow}>
                    <div>
                        <h4>SMS Bildirimleri</h4>
                        <p>Kritik güvenlik uyarıları ve onaylar için SMS al.</p>
                    </div>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e) =>
                                setNotifications((prev) => ({ ...prev, sms: e.target.checked }))
                            }
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </section>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => navigate("/anasayfa")}
                    disabled={saving}
                >
                    İptal
                </button>
                <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </button>
            </div>
        </div>
    );
};