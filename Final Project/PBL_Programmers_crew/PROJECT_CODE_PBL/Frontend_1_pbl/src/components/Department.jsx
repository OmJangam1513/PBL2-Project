"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getDepartmentInfo } from "../services/departmentService"
import "../styles/Department.css"

function Department({ goBack }) {
  const [departmentInfo, setDepartmentInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("about")
  const { user } = useAuth()

  useEffect(() => {
    const fetchDepartmentInfo = async () => {
      try {
        setLoading(true)
        const data = await getDepartmentInfo(user.departmentId)
        setDepartmentInfo(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching department info:", err)
        setError("Failed to load department information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDepartmentInfo()
  }, [user.departmentId])

  if (loading) return <div className="loading">Loading department information...</div>
  if (error) return <div className="error-message">{error}</div>

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="about-department">
            <div className="department-header">
              <div className="department-logo">
                {departmentInfo?.logo ? (
                  <img src={departmentInfo.logo || "/placeholder.svg"} alt={`${departmentInfo.name} Logo`} />
                ) : (
                  <div className="placeholder-logo">{departmentInfo?.name?.charAt(0) || "D"}</div>
                )}
              </div>
              <div className="department-title">
                <h3>{departmentInfo?.name}</h3>
                <p>{departmentInfo?.slogan}</p>
              </div>
            </div>

            <div className="department-description">
              <h4>About</h4>
              <p>{departmentInfo?.description}</p>
            </div>

            <div className="department-stats">
              <div className="stat-card">
                <span className="stat-value">{departmentInfo?.employeeCount}</span>
                <span className="stat-label">Employees</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{departmentInfo?.projectCount}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{departmentInfo?.completedProjects}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>
        )

      case "information":
        return (
          <div className="department-information">
            <h3>Department Information</h3>

            <div className="info-section">
              <h4>Mission</h4>
              <p>{departmentInfo?.mission}</p>
            </div>

            <div className="info-section">
              <h4>Vision</h4>
              <p>{departmentInfo?.vision}</p>
            </div>

            <div className="info-section">
              <h4>Goals</h4>
              <ul className="goals-list">
                {departmentInfo?.goals?.map((goal, index) => (
                  <li key={index} className="goal-item">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-section">
              <h4>Achievements</h4>
              <ul className="achievements-list">
                {departmentInfo?.achievements?.map((achievement, index) => (
                  <li key={index} className="achievement-item">
                    <span className="achievement-title">{achievement.title}</span>
                    <span className="achievement-date">{achievement.date}</span>
                    <p className="achievement-description">{achievement.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="contact-details">
            <h3>Contact Details</h3>

            <div className="contact-section">
              <h4>Department Head</h4>
              <div className="contact-card">
                <div className="contact-name">{departmentInfo?.head?.name}</div>
                <div className="contact-position">{departmentInfo?.head?.position}</div>
                <div className="contact-email">{departmentInfo?.head?.email}</div>
                <div className="contact-phone">{departmentInfo?.head?.phone}</div>
              </div>
            </div>

            <div className="contact-section">
              <h4>Location</h4>
              <div className="location-details">
                <p>{departmentInfo?.location?.building}</p>
                <p>{departmentInfo?.location?.floor}</p>
                <p>{departmentInfo?.location?.room}</p>
              </div>
            </div>

            <div className="contact-section">
              <h4>General Inquiries</h4>
              <p>Email: {departmentInfo?.contactEmail}</p>
              <p>Phone: {departmentInfo?.contactPhone}</p>
            </div>
          </div>
        )

      default:
        return (
          <div className="department-default">
            <p>Select a tab to view department information</p>
          </div>
        )
    }
  }

  return (
    <div className="department-container">
      <button className="back-button" onClick={() => goBack && goBack()}>Back</button>
      <h2>Department</h2>

      <div className="department-tabs">
        <button className={`tab-button ${activeTab === "about" ? "active" : ""}`} onClick={() => setActiveTab("about")}>
          About
        </button>
        <button
          className={`tab-button ${activeTab === "information" ? "active" : ""}`}
          onClick={() => setActiveTab("information")}
        >
          Information
        </button>
        <button
          className={`tab-button ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Details
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  )
}

export default Department

