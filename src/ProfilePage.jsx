import React, { useState, useEffect } from 'react'
import './ProfilePage.css'
import { mockStudySessions } from './mockData'
import { updateProfile } from './supabase/profile'

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
  const [profile, setProfile] = useState(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [newClass, setNewClass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Personal information editing state
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    major: '',
    year: ''
  })

  // Handle adding a new class
  const handleAddClass = async () => {
    if (!newClass.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Add the new class to the existing classes
      const updatedClasses = [...profile.classes, newClass.trim()]
      
      // Update profile using Supabase
      const updatedProfile = await updateProfile(
        null, // year
        null, // major  
        [newClass.trim()], // classes (only new classes)
        null, // firstName
        null  // lastName
      )
      
      // Update local state
      setProfile(prev => ({
        ...prev,
        classes: updatedClasses
      }))
      
      setNewClass('')
    } catch (err) {
      setError('Failed to add class: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle removing a class
  const handleRemoveClass = async (classToRemove) => {
    setLoading(true)
    setError(null)
    
    try {
      // Remove the class from the list
      const updatedClasses = profile.classes.filter(cls => cls !== classToRemove)
      
      // For now, we'll just update local state since updateProfile doesn't handle removal
      // TODO: Implement class removal in Supabase or handle differently
      setProfile(prev => ({
        ...prev,
        classes: updatedClasses
      }))
      
    } catch (err) {
      setError('Failed to remove class: ' + err.message)
    } finally {
      setLoading(false)
    }
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

  // Handle saving personal information
  const handleSavePersonal = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Update profile using Supabase
      const updatedProfile = await updateProfile(
        editForm.year ? parseInt(editForm.year) : null,
        editForm.major || null,
        null, // classes (not updating classes here)
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
    } catch (err) {
      setError('Failed to update profile: ' + err.message)
    } finally {
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

  // Filter study sessions to only show current user's sessions
  const currentUserSessions = mockStudySessions.filter(session => session.pid === profile.pid)


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
