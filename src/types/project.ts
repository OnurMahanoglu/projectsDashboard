export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Aktif' | 'Beklemede' | 'Tamamlandı';
}