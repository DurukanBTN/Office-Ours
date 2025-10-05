import React, { useState, useEffect } from 'react'
import './ProfilePage.css'
import { mockStudySessions } from './mockData'
import { updateProfile } from './supabase/profile'
import { getUserSessions } from './supabase/session'
import client from './supabase/client'

function ProfilePage({ onBack }) {

  // State management
  const [profile, setProfile] = useState({
    id: null,
    year: null,
    major: null,
    classes: [],
    first_name: null,
    last_name: null,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [newClass, setNewClass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [userSessions, setUserSessions] = useState([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  
  // Personal information editing state
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    major: '',
    year: ''
  })

  // Fetch user's profile data
  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true)
      const { data: { user } } = await client.auth.getUser()
      if (!user) throw new Error("User not found!")

      const { data: profileData, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) throw error

      // Update profile state with real data
      setProfile({
        id: profileData.id,
        year: profileData.year,
        major: profileData.major,
        classes: profileData.classes || [],
        first_name: profileData.first_name,
        last_name: profileData.last_name
      })

    } catch (error) {
      console.error('Error fetching user profile:', error)
      // Keep default empty profile if error
    } finally {
      setProfileLoading(false)
    }
  }

  // Fetch user's sessions
  const fetchUserSessions = async () => {
    try {
      setSessionsLoading(true)
      const sessions = await getUserSessions()
      setUserSessions(sessions)
    } catch (error) {
      console.error('Error fetching user sessions:', error)
      setUserSessions([])
    } finally {
      setSessionsLoading(false)
    }
  }

  // Load profile and sessions on component mount
  useEffect(() => {
    fetchUserProfile()
    fetchUserSessions()
  }, [])

  // Handle adding a new class
  const handleAddClass = async () => {
    if (!newClass.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Get current classes and add new one
      const updatedClasses = [...profile.classes, newClass.trim()]
      
      // Call updateProfile with the new classes array
      await updateProfile(
        null, // year - don't change
        null, // major - don't change
        [newClass.trim()], // classes - only the new class to add
        null, // firstName - don't change
        null  // lastName - don't change
      )
      
      // Update local state
      setProfile(prev => ({
        ...prev,
        classes: updatedClasses
      }))
      
      setNewClass('')
      setLoading(false)
      console.log('Class added successfully')
    } catch (error) {
      console.error('Error adding class:', error)
      setError('Failed to add class. Please try again.')
      setLoading(false)
    }
  }

  // Handle removing a class
  const handleRemoveClass = async (classToRemove) => {
    setLoading(true)
    setError(null)
    
    try {
      // Get updated classes array
      const updatedClasses = profile.classes.filter(cls => cls !== classToRemove)
      
      // Call updateProfile with the updated classes array
      await updateProfile(
        null, // year - don't change
        null, // major - don't change
        updatedClasses, // classes - the updated array
        null, // firstName - don't change
        null  // lastName - don't change
      )
      
      // Update local state
      setProfile(prev => ({
        ...prev,
        classes: updatedClasses
      }))
      
      setLoading(false)
      console.log('Class removed successfully')
    } catch (error) {
      console.error('Error removing class:', error)
      setError('Failed to remove class. Please try again.')
      setLoading(false)
    }
  }

  // Handle starting personal information edit
  const startPersonalEdit = () => {
    setEditForm({
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      major: profile.major || '',
      year: profile.year ? profile.year.toString() : ''
    })
    setIsEditingPersonal(true)
  }

  // Handle saving personal information
  const handleSavePersonal = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Call updateProfile with the form data
      await updateProfile(
        editForm.year ? parseInt(editForm.year) : null,
        editForm.major || null,
        null, // classes - we'll handle this separately
        editForm.firstName || null,
        editForm.lastName || null
      )
      
      // Update local state
      setProfile(prev => ({
        ...prev,
        first_name: editForm.firstName,
        last_name: editForm.lastName,
        major: editForm.major,
        year: editForm.year ? parseInt(editForm.year) : null
      }))
      
      setIsEditingPersonal(false)
      setLoading(false)
      console.log('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile. Please try again.')
      setLoading(false)
    }
  }

  // Handle canceling personal information edit
  const handleCancelPersonal = () => {
    setIsEditingPersonal(false)
    setEditForm({
      firstName: '',
      lastName: '',
      major: '',
      year: ''
    })
  }

  // Check if profile is complete (has all required fields and at least one class)
  const isProfileComplete = profile.first_name && 
                           profile.last_name && 
                           profile.major && 
                           profile.year && 
                           profile.classes.length > 0

  // Use real user sessions from Supabase
  const currentUserSessions = userSessions


  // Show loading state while fetching profile
  if (profileLoading) {
    return (
      <div className="profile-page">
        <button 
          className="back-button"
          onClick={onBack}
        >
          ← Back to Main
        </button>
        
        <div className="profile-content">
          <div className="profile-header">
            <h1>Profile</h1>
          </div>
          <div className="loading-message">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <button 
        className="back-button"
        onClick={onBack}
      >
        ← Back to Main
      </button>
      
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        
        <div className="profile-info">
          <div className="info-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditingPersonal && (
                <button 
                  className="edit-button"
                  onClick={startPersonalEdit}
                >
                  Edit
                </button>
              )}
            </div>
            
            {isEditingPersonal ? (
              <div className="edit-personal-section">
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name:</label>
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm(prev => ({...prev, firstName: e.target.value}))}
                        placeholder="Enter first name"
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm(prev => ({...prev, lastName: e.target.value}))}
                        placeholder="Enter last name"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Major:</label>
                      <input
                        type="text"
                        value={editForm.major}
                        onChange={(e) => setEditForm(prev => ({...prev, major: e.target.value}))}
                        placeholder="Enter major (e.g., Computer Science)"
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <label>Year:</label>
                      <input
                        type="number"
                        value={editForm.year}
                        onChange={(e) => setEditForm(prev => ({...prev, year: e.target.value}))}
                        placeholder="Enter year (1-5)"
                        min="1"
                        max="5"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-buttons">
                  <button 
                    className="cancel-button"
                    onClick={handleCancelPersonal}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    className="save-button"
                    onClick={handleSavePersonal}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
            ) : (
              <div className="info-display">
                <div className="info-item">
                  <span className="label">Name:</span>
                  <span className="value">
                    {profile.first_name && profile.last_name 
                      ? `${profile.first_name} ${profile.last_name}` 
                      : <span className="placeholder">Not set</span>
                    }
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Major:</span>
                  <span className="value">
                    {profile.major || <span className="placeholder">Not set</span>}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Year:</span>
                  <span className="value">
                    {profile.year || <span className="placeholder">Not set</span>}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="info-section">
            <div className="section-header">
              <h2>Classes</h2>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {isEditing && (
              <div className="add-class-section">
                <div className="add-class-input">
                  <input
                    type="text"
                    placeholder="Enter class name (e.g., CPSC 210)"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddClass()}
                    disabled={loading}
                  />
                  <button 
                    className="add-class-button"
                    onClick={handleAddClass}
                    disabled={loading || !newClass.trim()}
                  >
                    {loading ? 'Adding...' : 'Add Class'}
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
            )}
            
            <div className="classes-list">
              {profile.classes.map((className, index) => (
                <div key={index} className="class-item">
                  <span>{className}</span>
                  {isEditing && (
                    <button 
                      className="remove-class-button"
                      onClick={() => handleRemoveClass(className)}
                      disabled={loading}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isProfileComplete ? (
            <div className="info-section">
              <h2>Study Sessions</h2>
              <div className="study-sessions">
                {sessionsLoading ? (
                  <div className="loading-message">
                    <p>Loading your study sessions...</p>
                  </div>
                ) : currentUserSessions.length === 0 ? (
                  <div className="no-sessions-message">
                    <p>You haven't created any study sessions yet.</p>
                    <p>Go to the main page and click "+ Add Session" to create your first session!</p>
                  </div>
                ) : (
                  currentUserSessions.map((session) => (
                  <button 
                    key={session.id} 
                    className="study-session-box"
                    onClick={() => {
                      // TODO: Show study session on map
                      console.log('Study session clicked:', session)
                    }}
                  >
                    <div className="session-content">
                      <div className="session-normal-view">
                        <div className="session-header">
                          <span className="session-class">{session.class}</span>
                        </div>
                        <div className="session-details">
                          <div className="session-info">
                            <span className="detail-label">Created by:</span>
                            <span className="detail-value">You</span>
                          </div>
                          <div className="session-info">
                            <span className="detail-label">Date:</span>
                            <span className="detail-value">{new Date(session.start_time).toLocaleDateString()}</span>
                          </div>
                          <div className="session-info">
                            <span className="detail-label">Time:</span>
                            <span className="detail-value">
                              {new Date(session.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                              {new Date(session.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className="session-info">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{session.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="session-hover-view">
                        <div className="session-header">
                          <span className="session-class">{session.class}</span>
                        </div>
                        <div className="session-description">
                          <span className="description-label">Description:</span>
                          <span className="description-text">{session.description}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="info-section">
              <h2>Study Sessions</h2>
              <div className="incomplete-profile-message">
                <p>Complete your profile to view and create study sessions.</p>
                <p>You need to fill in your name, major, year, and add at least one class.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
