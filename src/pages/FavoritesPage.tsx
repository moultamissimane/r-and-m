import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import CharacterCard from '../components/CharacterCard';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Favorite Characters</h2>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No favorites yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring characters and add some to your favorites!
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Explore Characters
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;