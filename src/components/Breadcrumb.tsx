import { useLocation, Link } from 'react-router';

interface BreadcrumbProps {
  totalCount: number;
}

export const Breadcrumb = ({ totalCount }: BreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="page-header-row">
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Anasayfa</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <span key={to} className="breadcrumb-item">
              <span className="separator">/</span>
              {isLast ? (
                <span className="current">{formattedName}</span>
              ) : (
                <Link to={to} className="breadcrumb-link">{formattedName}</Link>
              )}
            </span>
          );
        })}
      </nav>
      <div className="result-count">
        Toplam <strong>{totalCount}</strong> kayıt bulundu
      </div>
    </div>
  );
};