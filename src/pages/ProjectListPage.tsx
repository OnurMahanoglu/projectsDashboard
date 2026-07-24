import { useEffect, useState } from 'react';
import type { Project, TableColumn } from '../types/project';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProjectTable } from '../components/ProjectTable';

const columns: TableColumn[] = [
  { key: 'id', label: 'KODU' },
  { key: 'name', label: 'PROJE / BANDROL ADI' },
  { key: 'startDate', label: 'BAŞLANGIÇ' },
  { key: 'endDate', label: 'BİTİŞ' },
  { key: 'status', label: 'DURUM' },
  { key: 'actions', label: 'İŞLEMLER', align: 'right' },
];

// Server kapalıysa ekranda görünecek örnek 2 veri
const initialMockProjects: Project[] = [
  {
    id: 'PRJ-01',
    name: 'Aroma A Projesi',
    startDate: '10 Oca 2026',
    endDate: '15 Haz 2026',
    status: 'AKTIF',
  },
  {
    id: 'PRJ-02',
    name: 'Beyaz B Bandrolü',
    startDate: '01 Şub 2026',
    endDate: '20 Tem 2026',
    status: 'BEKLEMEDE',
  },
];

interface ProjectListPageProps {
  searchTerm?: string;
}

export const ProjectListPage = ({ searchTerm = '' }: ProjectListPageProps) => {
  // Başlangıç değeri olarak mock verileri koyduk
  const [projects, setProjects] = useState<Project[]>(initialMockProjects);

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Sunucu çalışmıyorsa mock veriler kalmaya devam eder
      });
  }, []);

  const term = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const nameMatch = project.name?.toLowerCase().includes(term);
    const idMatch = project.id?.toLowerCase().includes(term);
    return nameMatch || idMatch;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Proje Listesi</h1>
          <p className="page-subtitle">Aktif projeler ve bandroller burada listelenir.</p>
        </div>
      </div>

      <Breadcrumb totalCount={filteredProjects.length} />
      <ProjectTable projects={filteredProjects} columns={columns} />
    </div>
  );
};