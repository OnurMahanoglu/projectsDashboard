import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { ProjectListPage } from "./pages/ProjectListPage";
import { ProjectManagePage } from "./pages/ProjectManagePage";
import { AccountSettingsPage } from "./pages/AccountSettingPage";
import { LogoutPage } from "./pages/login/LogoutPage.tsx";
import LoginPage from "./pages/login/loginPage";
import Home from "./pages/home/homePage";
import { HomePage } from "./pages/MainPage.tsx"
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
          <Route path="/anasayfa" element={<HomePage />} />
          <Route path="/projeler/liste" element={<ProjectListPage />} />
          <Route path="/projeler/yonetim" element={<ProjectManagePage />} />
          <Route path="/hesap/ayarlar" element={<AccountSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//npx json-server db.json
//docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
