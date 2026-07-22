import { useState } from 'react'
import './App.css'

const initialProjects = [
  { id: 'PRJ-01', name: 'Aroma A Projesi', startDate: '10 Oca 2026', endDate: '15 Haz 2026', status: 'Aktif' },
  { id: 'PRJ-02', name: 'Aroma B Projesi', startDate: '01 Şub 2026', endDate: '20 Tem 2026', status: 'Beklemede' },
  { id: 'PRJ-03', name: 'Beyaz A Bandrolü', startDate: '05 Mar 2026', endDate: '10 Ağu 2026', status: 'Aktif' },
  { id: 'PRJ-04', name: 'Beyaz B Bandrolü', startDate: '12 Nis 2026', endDate: '01 Eyl 2026', status: 'Tamamlandı' },
  { id: 'PRJ-05', name: 'Cihaz Yönetim Paneli', startDate: '20 May 2026', endDate: '30 Eki 2026', status: 'Aktif' },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = initialProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

        <div className="breadcrumb-wrapper">
          <nav className="breadcrumb">
            <a href="#">Anasayfa</a>
            <span className="separator">/</span>
            <a href="#">Projeler</a>
            <span className="separator">/</span>
            <span className="current">Proje Listesi</span>
          </nav>
          <div className="result-count">
            Toplam <strong>{filteredProjects.length}</strong> kayıt bulundu
          </div>
        </div>

        <main className="table-card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>KODU</th>
                <th>PROJE / BANDROL ADI</th>
                <th>BAŞLANGIÇ</th>
                <th>BİTİŞ</th>
                <th>DURUM</th>
                <th style={{ textAlign: 'right' }}>İŞLEMLER</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <span className="badge-id">{project.id}</span>
                    </td>
                    <td className="project-name">{project.name}</td>
                    <td className="date-text">{project.startDate}</td>
                    <td className="date-text">{project.endDate}</td>
                    <td>
                      <span className={`status-badge ${
                        project.status === 'Aktif' ? 'active' :
                        project.status === 'Tamamlandı' ? 'completed' : 'pending'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-detail">
                        <span>İncele</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-result">
                    <div className="empty-state">
                      <span>🔍</span>
                      <p>Aramanızla eşleşen hiçbir proje bulunamadı.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>

      </div>
    </div>
  )
}

export default App