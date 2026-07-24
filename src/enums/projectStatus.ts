export const ProjectStatus = {
  AKTIF: { label: 'Aktif', class: 'status-active' },
  BEKLEMEDE: { label: 'Beklemede', class: 'status-pending' },
  TAMAMLANDI: { label: 'Tamamlandı', class: 'status-completed' },
} as const;

export type ProjectStatusType = keyof typeof ProjectStatus;