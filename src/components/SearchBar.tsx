interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar contactos...🔎" 
        className="search-input"
      />
    </div>
  )
}

export default SearchBar