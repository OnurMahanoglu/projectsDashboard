import type { Project } from '../types/project';

interface ProjectTableProps {
  projects: Project[];
}

export const ProjectTable = ({ projects }: ProjectTableProps) => {
  return (
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
          {projects.length > 0 ? (
            projects.map((project) => (
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
  );
};