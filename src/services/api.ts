import { CharacterResponse, Character, FilterParams } from '../types/character';

const API_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (params: FilterParams = {}): Promise<CharacterResponse> => {
  const queryParams = new URLSearchParams();
  
  // Add filter parameters if they exist and are not empty
  if (params.name) queryParams.append('name', params.name);
  if (params.status) queryParams.append('status', params.status);
  if (params.species) queryParams.append('species', params.species);
  if (params.gender) queryParams.append('gender', params.gender);
  if (params.page) queryParams.append('page', params.page.toString());
  
  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
  
  try {
    const response = await fetch(`${API_URL}/character${query}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        // Return empty results for 404 (no matches)
        return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await fetch(`${API_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};