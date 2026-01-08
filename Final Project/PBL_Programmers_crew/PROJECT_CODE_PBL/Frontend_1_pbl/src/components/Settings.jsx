"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getSettings } from "../services/settingsService"
import "../styles/Settings.css"

function Settings({ onNavigateToProfile }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDocumentation, setShowDocumentation] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // Fetch settings data when component mounts
    const fetchSettings = async () => {
      try {
        setLoading(true)
        await getSettings(user.id) // Simulate API call
        setError(null)
      } catch (err) {
        console.error("Error fetching settings:", err)
        setError("Failed to load settings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [user.id])

  const handleChangePassword = () => {
    // In a real app, this would open a password change modal or navigate to a password change page
    alert("Change password functionality would open here")
  }

  const toggleDocumentation = () => {
    setShowDocumentation(!showDocumentation)
  }

  if (loading) return <div className="loading">Loading settings...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Profile Settings</h3>
        <div className="setting-item">
          <button className="settings-button" onClick={onNavigateToProfile}>
            Go to Profile
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Login Settings</h3>
        <div className="setting-item">
          <button className="password-button" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Help</h3>
        <div className="setting-item">
          <button className="help-button" onClick={toggleDocumentation}>
            {showDocumentation ? "Hide Documentation" : "View Documentation"}
          </button>
        </div>
      </div>

      {showDocumentation && (
        <div className="documentation-section">
          <h3>User Documentation</h3>

          <div className="documentation-content">
            <h4>Getting Started</h4>
            <p>
              Welcome to the Project Management System! This guide will help you understand how to use the system
              effectively.
            </p>
            <p>
              The system is designed to help you manage projects, communicate with team members, and track department
              information.
            </p>
          </div>

          <div className="documentation-content">
            <h4>Profile Management</h4>
            <p>
              <strong>Viewing Your Profile:</strong> Navigate to the Profile page to view and update your personal
              information.
            </p>
            <p>
              <strong>Changing Password:</strong> Go to Settings and click "Change Password" under Login Settings.
            </p>
          </div>

          <div className="documentation-content">
            <h4>Communication Tools</h4>
            <p>
              <strong>Meetings:</strong> View upcoming and past meetings in the Communication section.
            </p>
            <p>
              <strong>Employee Communication:</strong> Track your communication history with team members.
            </p>
          </div>

          <div className="documentation-content">
            <h4>Frequently Asked Questions</h4>

            <div className="faq-item">
              <h5>How do I reset my password?</h5>
              <p>
                Go to Settings, then click on "Change Password" under Login Settings. Follow the prompts to reset your
                password.
              </p>
            </div>

            <div className="faq-item">
              <h5>How can I update my profile information?</h5>
              <p>
                Navigate to the Profile page by clicking "Go to Profile" in Settings. Make your changes and click "Save
                Changes".
              </p>
            </div>

            <div className="faq-item">
              <h5>Who can see my profile information?</h5>
              <p>
                By default, your profile is visible to your team members. You can adjust your visibility settings in the
                Profile page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
