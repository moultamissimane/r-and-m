import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, StarOff, ArrowLeft } from 'lucide-react';
import { fetchCharacterById } from '../services/api';
import { Character } from '../types/character';
import { useFavorites } from '../context/FavoritesContext';
import { CharacterDetailSkeleton } from '../components/CharacterSkeleton';

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getCharacter = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const characterId = parseInt(id, 10);
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      } catch (err) {
        setError('Failed to load character details.');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };
    
    getCharacter();
  }, [id]);
  
  const handleFavoriteToggle = () => {
    if (!character) return;
    
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return <CharacterDetailSkeleton />;
  }
  
  if (error || !character) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <p className="text-red-600 dark:text-red-400 text-lg mb-4">
          {error || 'Character not found.'}
        </p>
        <button
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }
  
  // Helper to determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Extract episode numbers for display
  const episodeNumbers = character.episode.map(ep => {
    const match = ep.match(/\/(\d+)$/);
    return match ? match[1] : '';
  });
  
  // Check if character is a favorite
  const favorite = isFavorite(character.id);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Character image */}
        <div className="md:w-1/3 relative">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:bg-yellow-100 transition-colors duration-300"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? (
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
        
        {/* Character details */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{character.name}</h1>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className={`h-3 w-3 rounded-full ${getStatusColor(character.status)} mr-2`}></span>
              <span className="text-lg text-gray-700 dark:text-gray-300">
                {character.status} - {character.species}
              </span>
            </div>
            
            {character.type && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <p className="text-lg text-gray-800 dark:text-gray-200">{character.type}</p>
              </div>
            )}
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
              <p className="text-lg text-gray-800 dark:text-gray-200">{character.gender}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Origin</p>
              <p className="text-lg text-gray-800 dark:text-gray-200">{character.origin.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last known location</p>
              <p className="text-lg text-gray-800 dark:text-gray-200">{character.location.name}</p>
            </div>
          </div>
          
          {/* Episodes */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Appears in {episodeNumbers.length} episode{episodeNumbers.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {episodeNumbers.map((num) => (
                <div 
                  key={num} 
                  className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-1 text-center text-gray-800 dark:text-gray-200"
                >
                  Ep. {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;