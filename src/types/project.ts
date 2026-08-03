import type { ProjectStatusType } from '../enums/projectStatus';

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: ProjectStatusType;
}

export interface TableColumn {
  key: keyof Project | 'actions';
  label: string;
  align?: 'left' | 'right' | 'center';
}