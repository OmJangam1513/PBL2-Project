// API layer for project progress

/**
 * Fetches project progress data from the backend
 *
 * @returns {Promise<Object>} - The project progress data
 */
export const getProjectProgressAPI = async () => {
  const response = await fetch('/api/project-progress');
  if (!response.ok) throw new Error('Failed to fetch project progress data');
  return await response.json();
}