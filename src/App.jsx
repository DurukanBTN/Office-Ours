import { useState } from 'react'
import ubcLogo from './assets/ubc.png'
import MainPage from './MainPage'
import './App.css'
import MapComponent from './Maps/Maps'
import { signUp, signIn } from './supabase/auth'


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Show main page if logged in, otherwise show login form
  if (isLoggedIn) {
    return <MainPage onLogout={() => setIsLoggedIn(false)} />
  }

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
            onClick={async () => {
              try {
                // Sign in with Supabase
                const userId = await signIn(password, email)
                console.log('Login successful:', userId)
                
                // Clear form fields
                setEmail('')
                setPassword('')
                
                // Redirect to main page
                setIsLoggedIn(true)
              } catch (error) {
                console.error('Login failed:', error)
                alert('Invalid email or password. Please try again.')
              }
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
                  onClick={async () => {
                    // Validate password match
                    if (newPassword !== confirmPassword) {
                      alert('Passwords do not match. Please try again.')
                      return
                    }
                    
                    try {
                      // Create account with Supabase
                      const userId = await signUp(newPassword, newEmail)
                      console.log('Account created successfully:', userId)
                      
                      // Clear form and close modal
                      setShowCreateAccount(false)
                      setNewEmail('')
                      setNewPassword('')
                      setConfirmPassword('')
                      
                      // Show email authentication message
                      alert('Account created successfully! Please check your email and click the verification link to authenticate your account before logging in.')
                      
                      // Redirect to main page
                      setIsLoggedIn(true)
                    } catch (error) {
                      console.error('Error creating account:', error)
                      alert('Failed to create account. Please try again.')
                    }
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

export default App;