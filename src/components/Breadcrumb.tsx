import { useLocation, Link } from 'react-router';

interface BreadcrumbProps {
  totalCount: number;
}

export const Breadcrumb = ({ totalCount }: BreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumb-wrapper">
      <nav className="breadcrumb">
        <Link to="/">Anasayfa</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <span key={to} style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
              <span className="separator">/</span>
              {isLast ? (
                <span className="current">{formattedName}</span>
              ) : (
                <Link to={to}>{formattedName}</Link>
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