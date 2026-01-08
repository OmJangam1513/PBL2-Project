"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getNotifications, markNotificationAsRead } from "../services/notificationService"
import "../styles/Notifications.css"

function Notifications() {
  const [notifications, setNotifications] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [viewedNotification, setViewedNotification] = useState(null)
  const { user, hasRole } = useAuth()

  // Redirect if user doesn't have access to this page
  useEffect(() => {
    // All roles can access notifications
  }, [])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        // Pass user role to get role-based notifications
        const data = await getNotifications(user.id, user.role)
        setNotifications(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching notifications:", err)
        setError("Failed to load notifications. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [user.id, user.role])

  const handleViewNotification = async (notificationId) => {
    try {
      const notification = notifications.items.find((item) => item.id === notificationId)
      setViewedNotification(notification)

      if (!notification.read) {
        await markNotificationAsRead(notificationId)
        setNotifications((prev) => ({
          ...prev,
          items: prev.items.map((item) => (item.id === notificationId ? { ...item, read: true } : item)),
        }))
      }
    } catch (err) {
      console.error("Error viewing notification:", err)
    }
  }

  const handleBackToList = () => {
    setViewedNotification(null)
  }

  if (loading) return <div className="loading">Loading notifications...</div>
  if (error) return <div className="error-message">{error}</div>

  // Filter notifications based on active tab
  const filteredNotifications = notifications?.items?.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return true
  })

  // Render notification detail view
  if (viewedNotification) {
    return (
      <div className="notification-detail-container">
        <h2>Notification</h2>
        <button className="back-button" onClick={handleBackToList}>
          Back to Notifications
        </button>

        <div className="notification-detail">
          <div className="notification-header">
            <h3>{viewedNotification.subject}</h3>
            <span className="notification-time">{viewedNotification.sentTime}</span>
          </div>

          <div className="notification-field">
            <span className="field-label">Domain:</span>
            <span className="field-value">{viewedNotification.domain}</span>
          </div>

          <div className="notification-field">
            <span className="field-label">Project:</span>
            <span className="field-value">{viewedNotification.project}</span>
          </div>

          <div className="notification-field">
            <span className="field-label">Submodule:</span>
            <span className="field-value">{viewedNotification.submodule}</span>
          </div>

          <div className="notification-field">
            <span className="field-label">From:</span>
            <span className="field-value">{viewedNotification.from}</span>
          </div>

          <div className="notification-field">
            <span className="field-label">To:</span>
            <span className="field-value">{viewedNotification.to}</span>
          </div>

          <div className="notification-message">
            <div className="field-label">Message Details:</div>
            <div className="message-content">{viewedNotification.message}</div>
          </div>
        </div>
      </div>
    )
  }

  // Render notifications list
  return (
    <div className="notifications-container">
      <h2>Notifications</h2>

      <div className="notifications-tabs">
        <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
          All
        </button>
        <button
          className={`tab-button ${activeTab === "unread" ? "active" : ""}`}
          onClick={() => setActiveTab("unread")}
        >
          Unread
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications?.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? "read" : "unread"}`}
              onClick={() => handleViewNotification(notification.id)}
            >
              <div className="notification-icon">{notification.read ? "○" : "●"}</div>
              <div className="notification-content">
                <div className="notification-subject">{notification.subject}</div>
                <div className="notification-preview">{notification.preview}</div>
              </div>
              <div className="notification-time">{notification.sentTime}</div>
            </div>
          ))
        ) : (
          <div className="empty-notifications">No notifications found</div>
        )}
      </div>
    </div>
  )
}

export default Notifications

