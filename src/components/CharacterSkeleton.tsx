import React from 'react';

const CharacterSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-6 w-36 mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const CharacterDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="md:flex">
        <div className="md:w-1/3 w-full h-64 md:h-auto bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-6 md:w-2/3">
          <div className="h-8 w-48 mb-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-44 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="mt-6">
            <div className="h-6 w-36 mb-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSkeleton;