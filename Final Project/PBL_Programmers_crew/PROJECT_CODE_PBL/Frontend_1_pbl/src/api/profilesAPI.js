// API layer for profiles

/**
 * Fetches user profile from the backend with role-based filtering
 *
 * @param {string} userId - The ID of the user
 * @param {string} role - The role of the user
 * @returns {Promise<Object>} - The user's profile
 */
export const getProfileAPI = async (userId, role) => {
  const response = await fetch(`/api/users/${userId}/profile?role=${role}`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return await response.json();
};

/**
 * Updates user profile in the backend
 *
 * @param {string} userId - The ID of the user
 * @param {Object} profileData - The profile data to update
 * @returns {Promise<Object>} - The updated profile
 */
export const updateProfileAPI = async (userId, profileData) => {
  const response = await fetch(`/api/users/${userId}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return await response.json();
};

