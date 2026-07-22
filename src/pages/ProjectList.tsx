import type { Project } from '../types/project';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProjectTable } from '../components/ProjectTable';

const initialProjects: Project[] = [
  { id: 'PRJ-01', name: 'Aroma A Projesi', startDate: '10 Oca 2026', endDate: '15 Haz 2026', status: 'Aktif' },
  { id: 'PRJ-02', name: 'Aroma B Projesi', startDate: '01 Şub 2026', endDate: '20 Tem 2026', status: 'Beklemede' },
  { id: 'PRJ-03', name: 'Beyaz A Bandrolü', startDate: '05 Mar 2026', endDate: '10 Ağu 2026', status: 'Aktif' },
  { id: 'PRJ-04', name: 'Beyaz B Bandrolü', startDate: '12 Nis 2026', endDate: '01 Eyl 2026', status: 'Tamamlandı' },
  { id: 'PRJ-05', name: 'Cihaz Yönetim Paneli', startDate: '20 May 2026', endDate: '30 Eki 2026', status: 'Aktif' },
];

interface ProjectListProps {
  searchTerm?: string;
}

export const ProjectList = ({ searchTerm = '' }: ProjectListProps) => {
  const term = (searchTerm || '').trim().toLowerCase();

  const filteredProjects = initialProjects.filter((project) => {
    const nameMatch = project.name?.toLowerCase().includes(term);
    const idMatch = project.id?.toLowerCase().includes(term);
    return nameMatch || idMatch;
  });

  return (
    <>
      <Breadcrumb totalCount={filteredProjects.length} />
      <ProjectTable projects={filteredProjects} />
    </>
  );
};