interface BreadcrumbProps {
  totalCount: number;
}

export const Breadcrumb = ({ totalCount }: BreadcrumbProps) => {
  return (
    <div className="breadcrumb-wrapper">
      <nav className="breadcrumb">
        <a href="#">Anasayfa</a>
        <span className="separator">/</span>
        <a href="#">Projeler</a>
        <span className="separator">/</span>
        <span className="current">Proje Listesi</span>
      </nav>
      <div className="result-count">
        Toplam <strong>{totalCount}</strong> kayıt bulundu
      </div>
    </div>
  );
};