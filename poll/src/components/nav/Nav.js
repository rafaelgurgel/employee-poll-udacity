// src/components/Nav.js
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAuthedUser } from '../../actions/authedUser'
import getAvatar from '../../utils/getAvatar'

import './nav.css'


export default function Nav() {
  const dispatch = useDispatch()
  const authedUser = useSelector((state) => state.authedUser)
  const user = useSelector((state) => state.users[authedUser])
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutAuthedUser())
    navigate('/')
  }

  return (
    <nav className="nav">
      {authedUser && (
        <>
          <Link to="/home">Home</Link>
          <Link to="/add">New Poll</Link>
          <Link to="/leaderboard">Leaderboard</Link>

          <div className="nav-profile">
            <img
              src={user ? getAvatar(user.avatarURL) : 'https://via.placeholder.com/50'}
              alt={user ? `Avatar of ${user.name}` : 'Avatar'}
              className="nav-avatar"
            />
            <span>Hello, {user && user.name}</span>
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  )
}
