import React, { useState } from 'react'
import './AddPage.css'
import MapComponent from './Maps/Maps'
import { createSession } from './supabase/session'

function AddPage({ onBack }) {
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [studyClass, setStudyClass] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Convert datetime-local inputs to ISO strings for Supabase
      const startTimeISO = new Date(startTime).toISOString()
      const endTimeISO = new Date(endTime).toISOString()
      
      // Create session with Supabase
      const newSession = await createSession(
        location,
        startTimeISO,
        endTimeISO,
        studyClass,
        description
      )
      
      console.log('Session created successfully:', newSession)
      
      // Clear form fields
      setLocation('')
      setStartTime('')
      setEndTime('')
      setStudyClass('')
      setDescription('')
      
      // Show success message
      alert('Study session created successfully!')
      
      // Return to main page
      onBack()
      
    } catch (error) {
      console.error('Error creating session:', error)
      alert('Failed to create study session. Please try again.')
    }
  }

  return (
    <div className="add-page">
      <button 
        className="back-button"
        onClick={onBack}
      >
        ← Back to Main
      </button>
      
      <div className="map-container">
        <MapComponent />
      </div>
      
      <div className="form-container">
        <div className="form-header">
          <h2>Create Study Session</h2>
        </div>
        <div className="form-content">
          <form onSubmit={handleSubmit} className="session-form">
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Library Room 201"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <input
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="studyClass">Class:</label>
              <input
                type="text"
                id="studyClass"
                value={studyClass}
                onChange={(e) => setStudyClass(e.target.value)}
                placeholder="e.g., CPSC 210"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you'll be studying..."
                rows="4"
                required
              />
            </div>

            <div className="form-buttons">
              <button type="button" className="cancel-button" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="create-button">
                Create Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPage
