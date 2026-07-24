import { Routes, Route, Navigate } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout.tsx";
import { ProjectListPage } from "./pages/ProjectListPage.tsx";
import { ProjectManagePage } from "./pages/ProjectManagePage.tsx";
import { AccountSettingsPage } from "./pages/AccountSettingPage.tsx";
import { LogoutPage } from "./pages/LogoutPage.tsx";
import LoginPage from "./pages/login/loginPage";
import Projects from "./components/projects/projects";
import Home from "./pages/home/homePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sidebar ile görünecek iç sayfalar */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projeler/liste" element={<ProjectListPage />} />
                <Route path="/projeler/yonetim" element={<ProjectManagePage />} />
                <Route path="/hesap/ayarlar" element={<AccountSettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
  );
}

export default App;