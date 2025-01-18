import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetAuthedUser } from '../actions/shared'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // We'll store both username and password in local component state.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // We have all users in Redux state (shape: {sarahedo: {id, password, ...}, ...})
  const users = useSelector((state) => state.users)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if the user by this username exists
    const user = users[username]
    if (!user) {
      setError('User does not exist.')
      return
    }

    // Check if the password matches
    if (user.password !== password) {
      setError('Incorrect password.')
      return
    }

    // If credentials are correct, setAuthedUser to this user
    dispatch(handleSetAuthedUser(username))
    navigate('/home')
  }

  return (
    <div className="login-container" style={{ marginTop: 50 }}>
      <h2>Employee Polls Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username (e.g. sarahedo)"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError('')
          }}
        />

        <label htmlFor="password" style={{ marginTop: 10 }}>Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError('')
          }}
        />

        <button type="submit" style={{ marginTop: 20 }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
