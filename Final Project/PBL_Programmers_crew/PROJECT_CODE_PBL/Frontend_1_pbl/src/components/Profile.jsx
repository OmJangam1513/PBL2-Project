"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getProfile, updateProfile } from "../services/profilesService"
import "../styles/Profile.css"

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [profileImage, setProfileImage] = useState(null)
  const [pastExperiences, setPastExperiences] = useState([])
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    duration: "",
    description: "",
  })
  const { user, hasRole } = useAuth()

  // Role-based access control
  useEffect(() => {
    // All roles can access their own profile
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await getProfile(user.id, user.role) // Pass user role
        setProfile(data)
        setFormData({
          name: data.personalDetails.name,
          email: data.personalDetails.email,
          phone: data.personalDetails.phone,
          position: data.personalDetails.position,
          department: data.personalDetails.department,
          about: data.about || "",
          skills: data.skills ? data.skills.join(", ") : "",
        })
        setPastExperiences(data.pastExperience || [])
        setProfileImage(data.personalDetails.profileImage || null)
        setError(null)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Failed to load profile. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user.id, user.role]) // Add user.role as a dependency

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExperienceChange = (e) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddExperience = () => {
    if (newExperience.position && newExperience.company) {
      setPastExperiences((prev) => [...prev, { ...newExperience }])
      setNewExperience({
        position: "",
        company: "",
        duration: "",
        description: "",
      })
    }
  }

  const handleRemoveExperience = (index) => {
    setPastExperiences((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Prepare updated profile data
      const updatedProfile = {
        personalDetails: {
          ...profile.personalDetails,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          department: formData.department,
          profileImage: profileImage,
        },
        about: formData.about,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        pastExperience: pastExperiences,
      }

      // Send update to server
      await updateProfile(user.id, updatedProfile)

      // Update local state
      setProfile((prev) => ({
        ...prev,
        personalDetails: updatedProfile.personalDetails,
        about: updatedProfile.about,
        skills: updatedProfile.skills,
        pastExperience: updatedProfile.pastExperience,
      }))

      setIsEditing(false)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile. Please try again later.")
    }
  }

  if (loading) return <div className="loading">Loading profile...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-section">
            <h3>Personal Details</h3>

            <div className="profile-image-section">
              <div className="profile-image-container">
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="profile-image" />
                ) : (
                  <div className="profile-image-placeholder">{formData.name?.charAt(0) || "U"}</div>
                )}
              </div>
              <div className="profile-image-upload">
                <label htmlFor="profile-image" className="upload-button">
                  Change Photo
                </label>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="profile-section">
            <h3>Past Experience</h3>
            {pastExperiences.map((exp, index) => (
              <div key={index} className="experience-form-item">
                <div className="experience-form-header">
                  <h4>
                    {exp.position} at {exp.company}
                  </h4>
                  <button type="button" className="remove-button" onClick={() => handleRemoveExperience(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="add-experience-form">
              <h4>Add New Experience</h4>
              <div className="form-group">
                <label htmlFor="position">Position:</label>
                <input
                  type="text"
                  id="exp-position"
                  name="position"
                  value={newExperience.position}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company:</label>
                <input
                  type="text"
                  id="exp-company"
                  name="company"
                  value={newExperience.company}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration:</label>
                <input
                  type="text"
                  id="exp-duration"
                  name="duration"
                  value={newExperience.duration}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="exp-description"
                  name="description"
                  value={newExperience.description}
                  onChange={handleExperienceChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="button" className="add-button" onClick={handleAddExperience}>
                Add Experience
              </button>
            </div>
          </div>

          <div className="profile-section">
            <h3>Skills</h3>
            <div className="form-group">
              <label htmlFor="skills">Skills (comma-separated):</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills || ""}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="profile-section">
            <h3>About</h3>
            <div className="form-group">
              <label htmlFor="about">About:</label>
              <textarea
                id="about"
                name="about"
                value={formData.about || ""}
                onChange={handleInputChange}
                rows="5"
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="profile-section">
            <h3>Personal Details</h3>
            <div className="profile-details-container">
              <div className="profile-image-container">
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="profile-image" />
                ) : (
                  <div className="profile-image-placeholder">{profile?.personalDetails?.name?.charAt(0) || "U"}</div>
                )}
              </div>

              <div className="profile-details">
                <div className="profile-field">
                  <span className="field-label">Name:</span>
                  <span className="field-value">{profile?.personalDetails?.name}</span>
                </div>
                <div className="profile-field">
                  <span className="field-label">Email:</span>
                  <span className="field-value">{profile?.personalDetails?.email}</span>
                </div>
                <div className="profile-field">
                  <span className="field-label">Phone:</span>
                  <span className="field-value">{profile?.personalDetails?.phone}</span>
                </div>
                <div className="profile-field">
                  <span className="field-label">Position:</span>
                  <span className="field-value">{profile?.personalDetails?.position}</span>
                </div>
                <div className="profile-field">
                  <span className="field-label">Department:</span>
                  <span className="field-value">{profile?.personalDetails?.department}</span>
                </div>
              </div>
            </div>
          </div>

          {profile?.department && (
            <div className="profile-section">
              <h3>Department</h3>
              <p>{profile.department}</p>
            </div>
          )}

          {profile?.projectsAssigned && (
            <div className="profile-section">
              <h3>Projects Assigned</h3>
              <ul className="projects-list">
                {profile.projectsAssigned.map((project) => (
                  <li key={project.id} className="project-item">
                    <div className="project-name">{project.name}</div>
                    <div className="project-role">Role: {project.role}</div>
                    <div className="project-status">Status: {project.status}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile?.skills && (
            <div className="profile-section">
              <h3>Skills</h3>
              <div className="skills-container">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile?.pastExperience && (
            <div className="profile-section">
              <h3>Past Experience</h3>
              <ul className="experience-list">
                {profile.pastExperience.map((exp, index) => (
                  <li key={index} className="experience-item">
                    <div className="experience-position">{exp.position}</div>
                    <div className="experience-company">{exp.company}</div>
                    <div className="experience-duration">{exp.duration}</div>
                    <div className="experience-description">{exp.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="profile-section">
            <h3>About</h3>
            <p className="about-text">{profile?.about}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile

