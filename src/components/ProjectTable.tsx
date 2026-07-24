import type { Project, TableColumn } from '../types/project';
import { ProjectStatus } from '../enums/projectStatus';

interface ProjectTableProps {
  projects: Project[];
  columns: TableColumn[];
}

export const ProjectTable = ({ projects, columns }: ProjectTableProps) => {
  return (
    <div className="table-container">
      <table className="modern-table">
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
                        <button className="btn-action btn-edit">İncele</button>
                      </td>
                    );
                  }

                  if (col.key === 'status') {
                    const statusInfo = ProjectStatus[project.status];
                    return (
                      <td key={col.key}>
                        <span className={`status-badge ${statusInfo.class}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                    );
                  }

                  if (col.key === 'id') {
                    return (
                      <td key={col.key} className="col-id">
                        {project.id}
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
                Aramanızla eşleşen proje bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};