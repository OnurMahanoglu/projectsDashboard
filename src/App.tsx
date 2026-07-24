import { Routes, Route, Navigate } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout.tsx";
import { ProjectListPage } from "./pages/ProjectListPage.tsx";
import { ProjectManagePage } from "./pages/ProjectManagePage.tsx";
import { AccountSettingsPage } from "./pages/AccountSettingPage.tsx";

function App() {
  return (
       <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/projeler/liste" element={<ProjectListPage />} />
                <Route path="/projeler/yonetim" element={<ProjectManagePage />} />
                <Route path="/hesap/ayarlar" element={<AccountSettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
  );
}

export default App;