export const ProjectStatus = {
  AKTIF: 'Aktif',
  BEKLEMEDE: 'Beklemede',
  TAMAMLANDI: 'Tamamlandı',
} as const;

export type ProjectStatusType = typeof ProjectStatus[keyof typeof ProjectStatus];