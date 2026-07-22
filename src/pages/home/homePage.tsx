import "./homePage.css";
import { useNavigate } from "react-router-dom";
import trtLogo from "../../assets/trt-logo.webp"; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-buttons-wrapper">
      <img src={trtLogo} alt="TRT Logo" className="trt-logo" />
      <div className="home-buttons">
        <button className="btn btn-primary" onClick={() => navigate("/login")}>Giriş Yap</button>
        <button className="btn btn-outline" onClick={() => navigate("/projects")}>Projeler</button>
      </div>
    </div>
  );
}

export default Home;