// API layer for settings

/**
 * Fetches user settings from the backend
 *
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The user's settings
 */
export const getSettingsAPI = async (userId) => {
  const response = await fetch(`/api/users/${userId}/settings`)
  if (!response.ok) throw new Error("Failed to fetch settings")
  return await response.json()
}

/**
 * Updates user settings in the backend
 *
 * @param {string} userId - The ID of the user
 * @param {Object} settingsData - The settings data to update
 * @returns {Promise<Object>} - The updated settings
 */
export const updateSettingsAPI = async (userId, settingsData) => {
  const response = await fetch(`/api/users/${userId}/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settingsData),
  })
  if (!response.ok) throw new Error("Failed to update settings")
  return await response.json()
}
