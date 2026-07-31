import { useNavigate } from "react-router";

export const AccountSettingsPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Hesap Ayarları</h2>
            <p>Profil bilgilerinizi ve güvenlik ayarlarınızı buradan güncelleyebilirsiniz.</p>
            <br />
            <button onClick={() => navigate("/")}>
                Giriş Sayfasına Dön
            </button>
        </div>
    );
};