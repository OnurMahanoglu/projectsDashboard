interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <header className="top-header">
      <div className="search-container">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Proje veya Bandrol Ara..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => onSearchChange('')}>✕</button>
        )}
      </div>

      <div className="header-actions">
        <div className="user-profile">
          <div className="avatar">EG</div>
          <div className="user-info">
            <span className="user-name">Emre Gezer</span>
            <span className="user-role">Stajyer Geliştirici</span>
          </div>
        </div>
      </div>
    </header>
  );
};