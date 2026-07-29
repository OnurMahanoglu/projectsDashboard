import Header from './components/header/Header';
import ProjectListPage from './pages/projects/ProjectListPage';
import { SearchProvider } from './context/SearchContext';
// @ts-ignore
import styles from './App.module.css';

function App() {
  return (
    <SearchProvider>
      <div className={styles.appContainer}>
        <Header />
        <main className={styles.mainContent}>
          <ProjectListPage />
        </main>
      </div>
    </SearchProvider>
  );
}

export default App;