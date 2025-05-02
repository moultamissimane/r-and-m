import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img 
        src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif" 
        alt="Rick and Morty confused" 
        className="w-64 h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Looks like you've traveled to a dimension that doesn't exist.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
      >
        <Home className="h-5 w-5 mr-2" />
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;