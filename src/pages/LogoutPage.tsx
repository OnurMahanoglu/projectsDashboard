import { useNavigate } from "react-router";

export const LogoutPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f8fafc",
            fontFamily: "system-ui, sans-serif"
        }}>
            <h2>Başarıyla Çıkış Yapıldı</h2>
            <p style={{ color: "#64748b" }}>Oturumunuz güvenli bir şekilde sonlandırıldı.</p>
            <button
                onClick={() => navigate("/")}
                style={{
                    marginTop: "16px",
                    padding: "10px 20px",
                    backgroundColor: "#D2272F",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 600
                }}
            >
                Yeniden Giriş Yap / Anasayfa
            </button>
        </div>
    );
};