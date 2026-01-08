import { getNotificationsAPI, markNotificationAsReadAPI } from "../api/notificationAPI"
import mockNotifications from "../mockData/notifications.json"

// Service to handle notifications data with role-based filtering
export const getNotifications = async (userId, userRole) => {
  try {
    const data = await getNotificationsAPI(userId, userRole)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)

    // Filter notifications based on user role
    const filteredItems = mockNotifications.items.filter(
      (notification) =>
        !notification.requiredRole || notification.requiredRole === userRole || notification.requiredRole === "all",
    )

    return {
      ...mockNotifications,
      items: filteredItems,
    }
  }
}

export const markNotificationAsRead = async (notificationId) => {
  try {
    const data = await markNotificationAsReadAPI(notificationId)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)
    return { success: true, id: notificationId }
  }
}

