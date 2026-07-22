import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/homePage";
import Login from "./components/login/login";
import Projects from "./components/projects/projects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}

export default App;