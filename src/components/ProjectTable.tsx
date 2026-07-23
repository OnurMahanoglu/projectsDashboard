import type { Project, TableColumn } from '../types/project';
import { ProjectStatus } from '../enums/projectStatus';

interface ProjectTableProps {
  projects: Project[];
  columns: TableColumn[];
}

export const ProjectTable = ({ projects, columns }: ProjectTableProps) => {
  return (
    <main className="table-card">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: col.align || 'left' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project.id}>
                {columns.map((col) => {
                  if (col.key === 'actions') {
                    return (
                      <td key="actions" style={{ textAlign: 'right' }}>
                        <button className="btn-detail">
                          <span>İncele</span>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </td>
                    );
                  }

                  if (col.key === 'status') {
                    return (
                      <td key={col.key}>
                        <span className={`status-badge ${
                          project.status === ProjectStatus.AKTIF ? 'active' :
                          project.status === ProjectStatus.TAMAMLANDI ? 'completed' : 'pending'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    );
                  }

                  if (col.key === 'id') {
                    return (
                      <td key={col.key}>
                        <span className="badge-id">{project.id}</span>
                      </td>
                    );
                  }

                  return <td key={col.key}>{project[col.key]}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-result">
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