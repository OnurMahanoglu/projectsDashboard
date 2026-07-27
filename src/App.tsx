import { Routes, Route, Navigate, BrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout.tsx";
import { ProjectListPage } from "./pages/ProjectListPage.tsx";
import { ProjectManagePage } from "./pages/ProjectManagePage.tsx";
import { AccountSettingsPage } from "./pages/AccountSettingPage.tsx";
import Home from "./pages/home/homePage.tsx";
import { HomePage } from "./pages/MainPage.tsx";
import LoginPage from "./pages/login/loginPage.tsx";
import { LogoutPage } from "./pages/login/LogoutPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/anasayfa" element={<HomePage />} />
          <Route path="/projeler/liste" element={<ProjectListPage />} />
          <Route path="/projeler/yonetim" element={<ProjectManagePage />} />
          <Route path="/hesap/ayarlar" element={<AccountSettingsPage />} />
        </Route>
        <Route path="/cikis" element={<LogoutPage />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;