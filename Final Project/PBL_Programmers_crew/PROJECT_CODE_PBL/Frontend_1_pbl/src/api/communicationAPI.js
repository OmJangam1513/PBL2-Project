/**
 * Fetches user communications from the backend
 *
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The user's communications data
 */
export const getCommunicationsAPI = async (userId) => {
  const response = await fetch(`/api/users/${userId}/communications`)
  if (!response.ok) throw new Error("Failed to fetch communications")
  return await response.json()
}
