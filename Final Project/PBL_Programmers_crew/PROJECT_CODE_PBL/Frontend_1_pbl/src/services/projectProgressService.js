import { getProjectProgressAPI } from '../api/projectProgressAPI';
import mockData from '../mockData/projectProgress.json';

/**
 * Fetches project progress data using the API layer
 * Falls back to mock data if the API call fails
 *
 * @returns {Promise<Object>} - The project progress data
 */
export const getProjectProgress = async () => {
  try {
    return await getProjectProgressAPI();
  } catch (error) {
    console.error('Error fetching project progress from API, falling back to mock data:', error);
    return mockData;
  }
};