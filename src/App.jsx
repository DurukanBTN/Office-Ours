import { useState } from 'react'
import ubcLogo from './assets/ubc.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <>
      <div>
        <a href="https://ubc.ca" target="_blank">
          <img src={ubcLogo} className="logo react" alt="UBC logo" />
        </a>
      </div>
      <h1>UBC Study Buddies</h1>
      <div className="card">
        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button 
            className="login-button"
            onClick={() => {
              // TODO: Validate email and password with Supabase
              // TODO: Add error handling
              // TODO: Add loading state during login
              // TODO: Redirect to main page on successful login
              console.log('Login attempt:', { email, password })
            }}
          >
            Login
          </button>
          <button 
            className="create-account-button"
            onClick={() => setShowCreateAccount(true)}
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Create Account Modal */}
      {showCreateAccount && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create Account</h2>
              <button 
                className="close-button"
                onClick={() => setShowCreateAccount(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
              <div className="modal-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => setShowCreateAccount(false)}
                >
                  Cancel
                </button>
                <button 
                  className="create-button"
                  onClick={() => {
                    // TODO: Send user data to Supabase here
                    // TODO: Add validation (password match etc.)
                    // TODO: Add error handling for Supabase responses
                    // TODO: Add loading state during account creation
                    // TODO: Redirect to main page on login
                    console.log('Creating account:', { newEmail, newPassword })
                    setShowCreateAccount(false)
                    setNewEmail('')
                    setNewPassword('')
                    setConfirmPassword('')
                  }}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
