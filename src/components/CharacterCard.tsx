import React from 'react';
import { Link } from 'react-router-dom';
import { Star, StarOff } from 'lucide-react';
import { Character } from '../types/character';
import { useFavorites } from '../context/FavoritesContext';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-neon-teal';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift neon-border">
      <Link to={`/character/${character.id}`} className="block">
        <div className="relative overflow-hidden group">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 right-0 p-2">
            <button 
              onClick={handleFavoriteClick}
              className="p-2 glass-effect rounded-full transition-all duration-300 hover:scale-110"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {favorite ? (
                <Star className="h-6 w-6 text-neon-yellow fill-neon-yellow animate-pulse-slow" />
              ) : (
                <StarOff className="h-6 w-6 text-white/70" />
              )}
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${getStatusColor(character.status)} shadow-glow`}></span>
            <span className="text-sm text-gray-300">{character.status} - {character.species}</span>
          </div>
          <h3 className="text-xl font-bold text-white truncate group-hover:text-neon-teal transition-colors duration-300">
            {character.name}
          </h3>
          <div className="text-sm text-gray-400 space-y-1">
            <p className="truncate"><span className="text-gray-300">Last known location:</span></p>
            <p className="truncate">{character.location.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;