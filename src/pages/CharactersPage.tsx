import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCharacters } from '../services/api';
import { Character, FilterParams, Info } from '../types/character';
import CharacterCard from '../components/CharacterCard';
import CharacterSkeleton from '../components/CharacterSkeleton';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';

const CharactersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current filter state from URL parameters
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentFilters: FilterParams = {
    name: searchParams.get('name') || undefined,
    status: searchParams.get('status') || undefined,
    species: searchParams.get('species') || undefined,
    gender: searchParams.get('gender') || undefined,
    page: currentPage
  };

  // Fetch characters based on current filters
  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCharacters(currentFilters);
        setCharacters(response.results);
        setInfo(response.info);
      } catch (err) {
        setError('Failed to load characters. Please try again.');
        setCharacters([]);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [searchParams]);

  // Update URL when filters change
  const handleFilterChange = (filters: FilterParams) => {
    const newParams = new URLSearchParams();
    
    if (filters.name) newParams.set('name', filters.name);
    if (filters.status) newParams.set('status', filters.status);
    if (filters.species) newParams.set('species', filters.species);
    if (filters.gender) newParams.set('gender', filters.gender);
    
    // Reset to page 1 when filters change
    newParams.set('page', '1');
    
    setSearchParams(newParams);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Characters</h2>
      
      <FilterBar onFilterChange={handleFilterChange} initialFilters={currentFilters} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <CharacterSkeleton key={index} />
          ))}
        </div>
      ) : characters.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          
          {info && (
            <Pagination
              currentPage={currentPage}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No characters found matching your criteria.
          </p>
          <button
            onClick={() => handleFilterChange({})}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CharactersPage;