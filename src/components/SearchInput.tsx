import { Search, Filter } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void
  onFilterToggle: () => void
  showFilters: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  onFilterToggle,
  showFilters
}) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-100 text-gray-500 group-focus-within:text-white duration-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск фильмов, сериалов, шоу..."
          className="w-full pl-12 pr-16 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
        />
        <button
          onClick={onFilterToggle}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
            showFilters
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SearchInput