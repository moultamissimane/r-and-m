import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Star } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Layout: React.FC = () => {
  const { favorites } = useFavorites();
  
  return (
    <div className="min-h-screen bg-space">
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white animate-float">
                Rick & Morty Explorer
              </h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'glass-card text-neon-teal neon-border' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Characters
              </NavLink>
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                    isActive 
                      ? 'glass-card text-neon-yellow neon-border' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 bg-neon-yellow/20 text-neon-yellow text-xs font-semibold rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 z-50">
        <div className="flex justify-around">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `flex flex-col items-center py-3 px-4 transition-all duration-300 ${
                isActive 
                  ? 'text-neon-teal' 
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Characters</span>
          </NavLink>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `flex flex-col items-center py-3 px-4 transition-all duration-300 ${
                isActive 
                  ? 'text-neon-yellow' 
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <div className="relative">
              <Star className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-yellow/20 text-neon-yellow text-xs font-semibold rounded-full h-4 min-w-4 inline-flex items-center justify-center px-1">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Favorites</span>
          </NavLink>
        </div>
      </div>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-20 md:mb-6">
        <Outlet />
      </main>
      
      <footer className="glass-effect py-4 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            Built with the <a href="https://rickandmortyapi.com/" className="text-neon-teal hover:text-neon-purple transition-colors duration-300" target="_blank" rel="noopener noreferrer">Rick and Morty API</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;