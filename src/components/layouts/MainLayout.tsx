import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header"; // Veya Header dosyan neredeyse (örneğin: "../components/header/Header")

export const MainLayout = () => {
  return (
    <div>
      {/* Hocanın istediği: Header düzenin (Layout) içinde yer alıyor */}
      <Header />

      {/* Rotalardan gelen sayfalar buraya yüklenecek */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;