import React, { useState } from 'react'
import './MainPage.css'
import ProfilePage from './ProfilePage'
import { mockStudySessions } from './mockData'
import MapComponent from './Maps/Maps'

function MainPage({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedClasses, setSelectedClasses] = useState([])
  const [filteredSessions, setFilteredSessions] = useState(mockStudySessions)

  // Get unique classes from all sessions
  const uniqueClasses = [...new Set(mockStudySessions.map(session => session.class))]

  // Filter sessions based on selected classes
  const applyFilters = () => {
    if (selectedClasses.length === 0) {
      setFilteredSessions(mockStudySessions)
    } else {
      const filtered = mockStudySessions.filter(session => 
        selectedClasses.includes(session.class)
      )
      setFilteredSessions(filtered)
    }
    setShowFilterModal(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedClasses([])
    setFilteredSessions(mockStudySessions)
  }

  // Handle class checkbox change
  const handleClassChange = (className, isChecked) => {
    if (isChecked) {
      setSelectedClasses([...selectedClasses, className])
    } else {
      setSelectedClasses(selectedClasses.filter(cls => cls !== className))
    }
  }

  // Show profile page if profile is open, otherwise show main page
  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />
  }

  return (
    <div className="main-page">
      <button 
        className="logout-button"
        onClick={onLogout}
      >
        ← Back to Login
      </button>
      <button 
        className="profile-button"
        onClick={() => setShowProfile(true)}
      >
        View/Edit Profile
      </button>
      
      <div className="map-container">
        {/* <div className="map-placeholder">
          <p>Google Maps API</p>
        </div> */}
        <MapComponent>
            
        </MapComponent>
      </div>
      
      <div className="study-sessions-container">
        <div className="study-sessions-header">
          <h2>Study Sessions</h2>
          <div className="header-buttons">
            <button 
              className="reset-button"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
            <button 
              className="filter-button"
              onClick={() => setShowFilterModal(true)}
            >
              Filter Classes
            </button>
          </div>
        </div>
        <div className="study-sessions-list">
          {filteredSessions.map((session) => (
            <button 
            // TODO !!!!!!: instead of mockStudySessions we should map the sessions data we get
            //              from supabase
              key={session.id} 
              className="study-session-item"
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

      {/* Filter Classes Modal */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Filter Classes</h2>
              <button 
                className="close-button"
                onClick={() => setShowFilterModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="filter-content">
                <h3>Select Classes to Filter</h3>
                <div className="classes-list">
                  {uniqueClasses.map((className) => (
                    <div key={className} className="class-option">
                      <input
                        type="checkbox"
                        id={className}
                        checked={selectedClasses.includes(className)}
                        onChange={(e) => handleClassChange(className, e.target.checked)}
                      />
                      <label htmlFor={className}>{className}</label>
                    </div>
                  ))}
                </div>
                <div className="modal-buttons">
                  <button 
                    className="cancel-button"
                    onClick={() => setShowFilterModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="apply-button"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage
