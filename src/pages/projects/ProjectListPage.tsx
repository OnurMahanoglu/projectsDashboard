// @ts-ignore
import styles from './ProjectListPage.module.css';

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

const initialProjects: Project[] = [
  {
    id: 'PRJ-01',
    name: 'Aroma A Projesi',
    startDate: '10 Oca 2026',
    endDate: '15 Haz 2026',
    status: 'AKTİF',
  },
  {
    id: 'PRJ-02',
    name: 'Endüstriyel Boya Otomasyonu',
    startDate: '01 Şub 2026',
    endDate: '20 Ara 2026',
    status: 'DEVAM EDİYOR',
  },
];

export const ProjectListPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Proje Listesi</h2>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Kodu</th>
              <th>Proje Adı</th>
              <th>Başlangıç</th>
              <th>Bitiş</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {initialProjects.map((p) => (
              <tr key={p.id}>
                <td>
                  <span className={styles.codeBadge}>{p.id}</span>
                </td>
                <td style={{ fontWeight: 500 }}>{p.name}</td>
                <td>{p.startDate}</td>
                <td>{p.endDate}</td>
                <td>
                  <span
                    className={
                      p.status === 'AKTİF'
                        ? styles.statusActive
                        : styles.statusProgress
                    }
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectListPage;