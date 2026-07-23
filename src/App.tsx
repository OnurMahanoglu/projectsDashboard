import { useState } from 'react';
import { ProjectList } from './pages/ProjectList';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="main-layout">
      <div className="content-container">
        <header className="top-header">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Proje veya Bandrol Ara... (Örn: Aroma, PRJ-01)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>

          <div className="user-profile">
            <div className="avatar-wrapper">
              <div className="avatar">EG</div>
              <span className="status-indicator"></span>
            </div>
            <div className="user-info">
              <span className="user-name">Emre Gezer</span>
              <span className="user-role">Stajyer Geliştirici</span>
            </div>
            <span className="chevron-icon">▾</span>
          </div>
        </header>

        <div className="page-header" style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
            Proje ve Bandrol Yönetimi
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Sistemde kayıtlı aktif projeleri, bandrolleri ve durumlarını buradan takip edebilirsiniz.
          </p>
        </div>

        {/* 3. Sayfa İçeriği */}
        <ProjectList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;