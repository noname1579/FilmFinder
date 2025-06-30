import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';

interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchInputProps {
  onSearchResults: (results: SearchResult[]) => void;
  onFilterToggle?: () => void;
  showFilters?: boolean;
}

const SearchInput = ({ onSearchResults, onFilterToggle, showFilters }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const API_KEY = '645dd20a'

  // Функция поиска с debounce
  const searchOMDb = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setSuggestions(data.Search.slice(0, 8)); // Показываем первые 5 результатов
        onSearchResults(data.Search);
      } else {
        setError(data.Error || 'Ничего не найдено');
        setSuggestions([]);
      }
    } catch (err) {
      setError('Ошибка подключения к API');
      console.error('ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, onSearchResults]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchOMDb(searchTerm);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm, searchOMDb]);

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
          ) : (
            <Search className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
          )}
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Найти фильм или сериал..."
          className="w-full pl-12 pr-16 py-4 bg-gray-800/70 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          disabled={isLoading}
        />

        {onFilterToggle && (
          <button
            onClick={onFilterToggle}
            disabled={isLoading}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all cursor-pointer ${
              showFilters ? 'bg-blue-600 text-white' : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {suggestions.map((item) => (
              <li
                key={item.imdbID}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => {
                  setSearchTerm(item.Title);
                  onSearchResults([item]);
                  setShowSuggestions(false);
                }}
              >
                {item.Poster !== 'N/A' && (
                  <img
                    src={item.Poster}
                    className="w-8 h-8 mr-3 object-cover rounded"
                  />
                )}
                <div>
                  <div className="text-white">{item.Title}</div>
                  <div className="text-xs text-gray-400">
                    {item.Type === 'movie' ? 'Фильм' : 'Сериал'} - {item.Year}г
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <div className="absolute mt-5 text-md text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchInput