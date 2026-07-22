import "./homePage.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-buttons-wrapper">
      <div className="home-buttons">
        <button className="btn btn-primary" onClick={() => navigate("/login")}>Giriş Yap</button>
        <button className="btn btn-outline" onClick={() => navigate("/projects")}>Projeler</button>
      </div>
    </div>
  );
}

export default Home;