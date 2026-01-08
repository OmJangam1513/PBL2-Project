// API layer for news

/**
 * Fetches news data from the backend
 *
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The news data
 */
export const getNewsAPI = async (userId) => {
  const response = await fetch(`/api/users/${userId}/news`);
  if (!response.ok) throw new Error("Failed to fetch news");
  return await response.json();
};