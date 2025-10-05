import React from 'react'
import './ProfilePage.css'
import { mockStudySessions } from './mockData'

function ProfilePage({ onBack }) {
  // TODO: Replace with data from Supabase
  const mockProfile = {
    pid: 1, // pid?
    year: 3,
    major: "Computer Science",
    classes: ["CPSC 210", "MATH 200", "PHYS 101", "ENGL 112"],
    first_name: "MockName",
    last_name: "MockSurname",
  }

  // Filter study sessions to only show current user's sessions
  
  // TODO !!!!!!: instead of mockStudySessions we should map the sessions data we get
  //              from supabase
  const currentUserSessions = mockStudySessions.filter(session => session.pid === mockProfile.pid)


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
            <h2>Personal Information</h2>
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{mockProfile.first_name} {mockProfile.last_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Major:</span>
              <span className="value">{mockProfile.major}</span>
            </div>
            <div className="info-item">
              <span className="label">Year:</span>
              <span className="value">{mockProfile.year}</span>
            </div>
          </div>

          <div className="info-section">
            <h2>Classes</h2>
            <div className="classes-list">
              {mockProfile.classes.map((className, index) => (
                <div key={index} className="class-item">
                  {className}
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
