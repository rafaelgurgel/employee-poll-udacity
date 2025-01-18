// src/components/Login.js
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetAuthedUser } from '../../actions/shared'
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // We'll store both username and password in local component state.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // All users in Redux state
  const users = useSelector((state) => state.users)

  // 1. On mount, check if there's an authedUser in localStorage
  //    and dispatch if it exists
  useEffect(() => {
    const storedUser = localStorage.getItem('authedUser')
    if (storedUser) {
      dispatch(handleSetAuthedUser(storedUser))
      // Optionally navigate to /home automatically if you want
      // navigate('/home')
    }
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = users[username]
    if (!user) {
      setError('User does not exist.')
      return
    }

    if (user.password !== password) {
      setError('Incorrect password.')
      return
    }

    localStorage.setItem('authedUser', username)
    console.log(localStorage)
    dispatch(handleSetAuthedUser(username))
    navigate('/home')
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Employee Polls Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
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

        <label htmlFor="password">Password</label>
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

        <button type="submit">Login</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}
