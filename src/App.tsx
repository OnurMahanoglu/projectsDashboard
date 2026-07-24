import { useState } from 'react';
import { BrowserRouter } from 'react-router';
import { Header } from './components/Header';
import { ProjectListPage } from './pages/ProjectListPage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="main-wrapper">
          <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <main className="main-content">
            <ProjectListPage searchTerm={searchTerm} />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;