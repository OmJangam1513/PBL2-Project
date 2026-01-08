// API layer for notifications


/**
 * Fetches user notifications from the backend
 *
 * @param {string} userId - The ID of the user
 * @param {string} userRole - The role of the user (for role-based filtering)
 * @returns {Promise<Object>} - The user's notifications
 *
 */
export const getNotificationsAPI = async (userId, userRole) => {
  const response = await fetch(`/api/users/${userId}/notifications?role=${userRole}`)
  if (!response.ok) throw new Error("Failed to fetch notifications")
  return await response.json()
}

/**
 * Marks a notification as read in the backend
 *
 * @param {string} notificationId - The ID of the notification
 * @returns {Promise<Object>} - The updated notification
 *
 */
export const markNotificationAsReadAPI = async (notificationId) => {
  const response = await fetch(`/api/notifications/${notificationId}/read`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) throw new Error("Failed to mark notification as read")
  return await response.json()
}

