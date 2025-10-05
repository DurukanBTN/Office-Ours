import React, { useState, useEffect } from 'react'
import './ProfilePage.css'
import { mockStudySessions } from './mockData'

function ProfilePage({ onBack }) {
  // TODO: Replace with data from Supabase
  const mockProfile = {
    pid: 1, // pid?
    year: null,
    major: null,
    classes: [], // Start with empty classes array
    first_name: null,
    last_name: null,
  }

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
  
  // Personal information editing state
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    major: '',
    year: ''
  })

  // Load profile on component mount - using mock data for now
  useEffect(() => {
    setProfileLoading(false)
  }, [])

  // Handle adding a new class (UI only - no database interaction)
  const handleAddClass = () => {
    if (!newClass.trim()) return
    
    setLoading(true)
    setError(null)
    
    // Simulate loading
    setTimeout(() => {
      // Update local state only
      setProfile(prev => ({
        ...prev,
        classes: [...prev.classes, newClass.trim()]
      }))
      
      setNewClass('')
      setLoading(false)
    }, 500)
  }

  // Handle removing a class (UI only - no database interaction)
  const handleRemoveClass = (classToRemove) => {
    setLoading(true)
    setError(null)
    
    // Simulate loading
    setTimeout(() => {
      // Update local state only
      setProfile(prev => ({
        ...prev,
        classes: prev.classes.filter(cls => cls !== classToRemove)
      }))
      
      setLoading(false)
    }, 300)
  }

  // Handle starting personal information edit
  const startPersonalEdit = () => {
    setEditForm({
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      major: profile.major || '',
      year: profile.year || ''
    })
    setIsEditingPersonal(true)
  }

  // Handle saving personal information (UI only - no database interaction)
  const handleSavePersonal = () => {
    setLoading(true)
    setError(null)
    
    // Simulate loading
    setTimeout(() => {
      // Update local state only
      setProfile(prev => ({
        ...prev,
        first_name: editForm.firstName,
        last_name: editForm.lastName,
        major: editForm.major,
        year: editForm.year ? parseInt(editForm.year) : null
      }))
      
      setIsEditingPersonal(false)
      setLoading(false)
    }, 800)
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

  // Filter study sessions to only show current user's sessions
  const currentUserSessions = mockStudySessions.filter(session => session.pid === profile.id)


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
                {currentUserSessions.map((session) => (
                  <button 
                    key={session.id} 
                    className="study-session-box"
                    onClick={() => {
                      // TODO: Show study session on map
                      console.log('Study session clicked:', session)
                    }}
                  >
                    <div className="session-header">
                      <span className="session-class">{session.class}</span>
                    </div>
                    <div className="session-details">
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
                      <div className="session-info">
                        <span className="detail-label">Description:</span>
                        <span className="detail-value">{session.description}</span>
                      </div>
                    </div>
                  </button>
                ))}
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
