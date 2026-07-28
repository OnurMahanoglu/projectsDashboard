import { useSearch } from '../context/SearchContext';

export const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Proje ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
};