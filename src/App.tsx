import { Routes, Route } from "react-router";
import Home from "./pages/home/homePage";
import LoginPage from "./pages/login/loginPage";
import Projects from "./components/projects/projects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}

export default App;