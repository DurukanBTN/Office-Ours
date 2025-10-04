import React, { useState } from 'react'
import './MainPage.css'
import ProfilePage from './ProfilePage'

function MainPage({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false)

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
      {/* Empty page - content will be added later */}
    </div>
  )
}

export default MainPage
