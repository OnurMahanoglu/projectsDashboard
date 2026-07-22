interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <header className="top-header">
      <div className="search-box">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Proje veya Bandrol Ara... (Örn: Aroma, PRJ-01)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => onSearchChange('')}>✕</button>
        )}
      </div>

      <div className="user-profile">
        <div className="avatar-wrapper">
          <div className="avatar">EG</div>
          <span className="status-indicator"></span>
        </div>
        <div className="user-info">
          <span className="user-name">Emre Gezer</span>
          <span className="user-role">Stajyer Geliştirici</span>
        </div>
        <span className="chevron-icon">▾</span>
      </div>
    </header>
  );
};

export default Header;