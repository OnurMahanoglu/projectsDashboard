import { BrowserRouter } from 'react-router';
import { Header } from './components/Header';
import { ProjectListPage } from './pages/ProjectListPage';
import { SearchProvider } from './context/SearchContext';
import './App.css';

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <div className="app-container">
          <div className="main-wrapper">
            <Header />
            <main className="main-content">
              <ProjectListPage />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;