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

interface ProjectListProps {
  searchTerm?: string;
}

export const ProjectList = ({ searchTerm = '' }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Veri çekme hatası:', err);
        setLoading(false);
      });
  }, []);

  const term = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const nameMatch = project.name?.toLowerCase().includes(term);
    const idMatch = project.id?.toLowerCase().includes(term);
    return nameMatch || idMatch;
  });

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Yükleniyor...</div>;
  }

  return (
    <>
      <Breadcrumb totalCount={filteredProjects.length} />
      <ProjectTable projects={filteredProjects} columns={columns} />
    </>
  );
};