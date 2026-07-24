import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProjectListPage } from "./pages/ProjectListPage.tsx";
import { ProjectManagePage } from "./pages/ProjectManagePage.tsx";
import { AccountSettingsPage } from "./pages/AccountSettingPage.tsx";
import { LogoutPage } from "./pages/LogoutPage.tsx";
import LoginPage from "./pages/login/loginPage";
import Projects from "./components/projects/projects";

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
                <Route path="/" element={<HomePage />} />
                <Route path="/projeler/liste" element={<ProjectListPage />} />
                <Route path="/projeler/yonetim" element={<ProjectManagePage />} />
                <Route path="/hesap/ayarlar" element={<AccountSettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          }
        />

        {/* Sidebar OLMADAN görünecek bağımsız çıkış sayfası */}
        <Route path="/cikis" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;