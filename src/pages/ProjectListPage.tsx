import { useNavigate } from "react-router";

export const ProjectListPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Proje Listesi</h2>
            <p>Aktif projeler burada listelenir.</p>
            <button onClick={() => navigate("/projeler/yonetim")}>
                Proje Yönetimine Git (useNavigate Örneği)
            </button>
        </div>
    );
};