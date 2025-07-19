import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Species } from '../../types/species';

interface SearchBarProps {
  species: Species[];
  onSearchResults: (results: Species[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  species, 
  onSearchResults, 
  placeholder = "Search for species..." 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Species[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const filtered = species.filter(s => 
        s.commonName.toLowerCase().includes(query.toLowerCase()) ||
        s.scientificName.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      onSearchResults(filtered);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearchResults(species);
    }
  }, [query, species, onSearchResults]);

  const handleSelectSpecies = (selectedSpecies: Species) => {
    setQuery(selectedSpecies.commonName);
    setShowSuggestions(false);
    onSearchResults([selectedSpecies]);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearchResults(species);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border-2 border-emerald-200 rounded-lg 
                   focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100
                   bg-white shadow-sm transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                     hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-emerald-200 
                      rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((species) => (
            <button
              key={species.id}
              onClick={() => handleSelectSpecies(species)}
              className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors
                       border-b border-emerald-100 last:border-b-0 group"
            >
              <div className="font-medium text-gray-900 group-hover:text-emerald-700">
                {species.commonName}
              </div>
              <div className="text-sm text-gray-500 italic">
                {species.scientificName}
              </div>
              <div className="text-xs text-emerald-600 mt-1 capitalize">
                {species.type} • {species.conservationStatus.replace('_', ' ')}
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-emerald-200 
                      rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
          No species found matching "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;