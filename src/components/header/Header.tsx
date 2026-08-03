import React, { useState } from "react";
import styles from "./header.module.css";

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
}

interface HeaderProps {
  menuItems?: MenuItem[];
}

export const Header: React.FC<HeaderProps> = ({ menuItems = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenuItems = menuItems.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className={styles.header}>
      {/* Arama Kutusu */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Menüde ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {searchTerm && (
        <div className={styles.searchResults}>
          {filteredMenuItems.length > 0 ? (
            <ul>
              {filteredMenuItems.map((item, index) => (
                <li key={index} className={styles.resultItem}>
                  <a href={item.path || "#"}>{item.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noResult}>Sonuç bulunamadı</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;