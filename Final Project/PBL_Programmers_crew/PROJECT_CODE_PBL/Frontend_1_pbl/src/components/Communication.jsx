"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getCommunications } from "../services/communicationService"
import "../styles/Communication.css"

function Communication({ goBack }) {
  const [communications, setCommunications] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("meetings")
  const { user } = useAuth()

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        setLoading(true)
        const data = await getCommunications(user.id)
        setCommunications(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching communications:", err)
        setError("Failed to load communications. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCommunications()
  }, [user.id])

  if (loading) return <div className="loading">Loading communications...</div>
  if (error) return <div className="error-message">{error}</div>

  const renderTabContent = () => {
    switch (activeTab) {
      case "meetings":
        return (
          <div className="meetings-container">
            <h3>Meetings Details</h3>
            <div className="meetings-list">
              {communications?.meetings?.map((meeting) => (
                <div key={meeting.id} className="meeting-item">
                  <div className="meeting-header">
                    <h4>{meeting.title}</h4>
                    <span className={`meeting-status ${meeting.status.toLowerCase()}`}>{meeting.status}</span>
                  </div>
                  <div className="meeting-details">
                    <p><strong>Date:</strong> {meeting.date}</p>
                    <p><strong>Time:</strong> {meeting.time}</p>
                    <p><strong>Location:</strong> {meeting.location}</p>
                    <p><strong>Organizer:</strong> {meeting.organizer}</p>
                  </div>
                  <div className="meeting-description">
                    <p>{meeting.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "employee":
        return (
          <div className="employee-communication-container">
            <h3>Employee Contact Details</h3>
            <div className="employee-list">
              {communications?.employees?.map((employee) => (
                <div key={employee.id} className="employee-item">
                  <div className="employee-info">
                    <h4>{employee.name}</h4>
                    <p>{employee.position}</p>
                    <p>{employee.email}</p>
                  </div>
                  <div className="communication-stats">
                    <div className="stat-item">
                      <span className="stat-label">Department:</span>
                      <span className="stat-value">{employee.department}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <div className="messages-container"><h3>No Content Available</h3></div>
    }
  }

  return (
    <div className="communication-container">
      <button className="back-button" onClick={() => goBack && goBack()}>Back</button>
      <h2>Communication</h2>

      <div className="communication-tabs">
        <button
          className={`tab-button ${activeTab === "meetings" ? "active" : ""}`}
          onClick={() => setActiveTab("meetings")}
        >
          Meetings Details
        </button>
        <button
          className={`tab-button ${activeTab === "employee" ? "active" : ""}`}
          onClick={() => setActiveTab("employee")}
        >
          Employee Contacts
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  )
}

export default Communication
