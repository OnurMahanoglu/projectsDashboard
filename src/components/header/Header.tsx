import styles from './header.module.css';
import { useSearch } from '../../context/SearchContext';

export function Header() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <span>Dashboard</span>
      </div>

      <div className={styles.headerRight}>
        <input
          type="text"
          placeholder="Proje ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.placeholderUser}>Profil</div>
      </div>
    </header>
  );
}

export default Header;