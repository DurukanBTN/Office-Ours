import React from 'react'
import './ProfilePage.css'

function ProfilePage({ onBack }) {
  // TODO: Replace with data from Supabase
  const mockProfile = {
    firstName: "MockName",
    lastName: "MockSurname",
    classes: ["CPSC 210", "MATH 200", "PHYS 101", "ENGL 112"],
    major: "Mock Major",
    year: "Mock year"
  }

  // TODO: Replace with data from Supabase
  const mockStudySessions = [
    {
      id: 1,
      class: "CPSC 210",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      location: "Library Room 201"
    },
    {
      id: 2,
      class: "MATH 200",
      date: "2024-01-16",
      time: "6:00 PM - 8:00 PM",
      location: "Math Building Room 501"
    },
    {
      id: 3,
      class: "PHYS 101",
      date: "2024-01-18",
      time: "1:00 PM - 3:00 PM",
      location: "Physics Building Room 105"
    }
  ]

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
              <span className="value">{mockProfile.firstName} {mockProfile.lastName}</span>
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
              {mockStudySessions.map((session) => (
                <div key={session.id} className="study-session-box">
                  <div className="session-header">
                    <span className="session-class">{session.class}</span>
                  </div>
                  <div className="session-details">
                    <div className="session-info">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{session.date}</span>
                    </div>
                    <div className="session-info">
                      <span className="detail-label">Time:</span>
                      <span className="detail-value">{session.time}</span>
                    </div>
                    <div className="session-info">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{session.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
