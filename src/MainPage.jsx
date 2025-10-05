import React, { useState, useEffect } from 'react'
import './MainPage.css'
import ProfilePage from './ProfilePage'
import AddPage from './AddPage'
import { mockStudySessions } from './mockData'
import MapComponent from './Maps/Maps'
import * as profile from './supabase/profile'
import { allSessions } from './supabase/session'

function MainPage({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false)
  const [showAddPage, setShowAddPage] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedClasses, setSelectedClasses] = useState([])
  const [studySessions, setStudySessions] = useState([])
  const [filteredSessions, setFilteredSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [highlightedSession, setHighlightedSession] = useState(null)

  // Function to fetch sessions from Supabase
  const fetchSessions = async () => {
    try {
      setLoading(true)
      const sessions = await allSessions()
      setStudySessions(sessions)
      setFilteredSessions(sessions)
    } catch (error) {
      console.error('Error fetching sessions:', error)
      // Fallback to mock data if Supabase fails
      setStudySessions(mockStudySessions)
      setFilteredSessions(mockStudySessions)
    } finally {
      setLoading(false)
    }
  }

  // Fetch sessions from Supabase on component mount
  useEffect(() => {
    fetchSessions()
  }, [])

  // Get unique classes from all sessions
  const uniqueClasses = [...new Set(studySessions.map(session => session.class))]

  // Filter sessions based on selected classes
  const applyFilters = () => {
    if (selectedClasses.length === 0) {
      setFilteredSessions(studySessions)
    } else {
      const filtered = studySessions.filter(session => 
        selectedClasses.includes(session.class)
      )
      setFilteredSessions(filtered)
    }
    setShowFilterModal(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedClasses([])
    setFilteredSessions(studySessions)
  }

  // Handle class checkbox change
  const handleClassChange = (className, isChecked) => {
    if (isChecked) {
      setSelectedClasses([...selectedClasses, className])
    } else {
      setSelectedClasses(selectedClasses.filter(cls => cls !== className))
    }
  }

  // Show profile page if profile is open
  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />
  }

  // Show add page if add page is open
  if (showAddPage) {
    return <AddPage onBack={() => {
      setShowAddPage(false)
      fetchSessions() // Refresh sessions when returning from AddPage
    }} />
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
        className="add-button"
        onClick={() => setShowAddPage(true)}
      >
        + Add Session
      </button>
      <button 
        className="profile-button"
        onClick={() => setShowProfile(true)}
      >
        View/Edit Profile
      </button>
      
      <div className="map-container">
        <MapComponent 
          sessions={studySessions} 
          highlightedSession={highlightedSession}
          onSessionClick={(session) => setHighlightedSession(session)}
        />
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
              onClick={() => 
               setShowFilterModal(true)}
              >
              Filter Classes
            </button>
          </div>
        </div>
        <div className="study-sessions-list">
          {loading ? (
            <div className="loading-message">
              <p>Loading study sessions...</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="no-sessions-message">
              <p>No study sessions found.</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <button 
                key={session.id} 
                className={`study-session-item ${highlightedSession && highlightedSession.id === session.id ? 'highlighted' : ''}`}
                onClick={() => {
                  setHighlightedSession(session)
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
                      <span className="detail-value">
                        {session.profiles ? 
                          `${session.profiles.first_name || 'Unknown'} ${session.profiles.last_name || 'User'}` : 
                          'Unknown User'
                        }
                      </span>
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
