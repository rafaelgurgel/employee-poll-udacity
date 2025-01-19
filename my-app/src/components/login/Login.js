// src/components/Login.js
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetAuthedUser } from '../../actions/shared'
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const users = useSelector((state) => state.users)

  useEffect(() => {
    const storedUser = localStorage.getItem('authedUser')
    if (storedUser) {
      dispatch(handleSetAuthedUser(storedUser))
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

    // localStorage.setItem('authedUser', username)
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
