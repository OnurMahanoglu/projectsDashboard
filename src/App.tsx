import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import { ProjectManagePage } from "./pages/ProjectManagePage";
import { AccountSettingsPage } from "./pages/AccountSettingPage";
import { LogoutPage } from "./pages/login/LogoutPage.tsx";
import LoginPage from "./pages/login/loginPage";
import Home from "./pages/home/homePage";
import { MainPage } from "./pages/MainPage.tsx";
import RegisterPage from "./pages/login/registerPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kayit-ol" element={<RegisterPage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/cikis" element={<LogoutPage />} />
        <Route path="/" element={<Home />} />

        <Route element={<MainLayout />}>
          <Route path="/anasayfa" element={<MainPage />} />
          <Route path="/projeler/yonetim" element={<ProjectManagePage />} />
          <Route path="/hesap/ayarlar" element={<AccountSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;