import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterParams } from '../types/character';

interface FilterBarProps {
  onFilterChange: (filters: FilterParams) => void;
  initialFilters?: FilterParams;
}

const STATUS_OPTIONS = ['', 'Alive', 'Dead', 'Unknown'];
const GENDER_OPTIONS = ['', 'Female', 'Male', 'Genderless', 'Unknown'];

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, initialFilters = {} }) => {
  const [name, setName] = useState(initialFilters.name || '');
  const [status, setStatus] = useState(initialFilters.status || '');
  const [species, setSpecies] = useState(initialFilters.species || '');
  const [gender, setGender] = useState(initialFilters.gender || '');
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ name, status, species, gender });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [name, status, species, gender, onFilterChange]);

  const resetFilters = () => {
    setName('');
    setStatus('');
    setSpecies('');
    setGender('');
  };

  const hasActiveFilters = status || species || gender;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search characters..."
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {name && (
          <button
            onClick={() => setName('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      {/* Filter toggle button */}
      <div className="mt-3 flex justify-between items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
        >
          <Filter className="h-4 w-4 mr-1" />
          {showFilters ? 'Hide filters' : 'Show filters'}
          {hasActiveFilters && !showFilters && (
            <span className="ml-2 px-1.5 py-0.5 bg-teal-100 text-teal-800 text-xs rounded-full dark:bg-teal-900 dark:text-teal-200">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
          >
            Reset filters
          </button>
        )}
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option || 'Any status'}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Species
            </label>
            <input
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              placeholder="Any species"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option || 'Any gender'}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;