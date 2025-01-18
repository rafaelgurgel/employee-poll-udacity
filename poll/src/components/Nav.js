import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAuthedUser } from '../actions/authedUser'

// A small helper: if user.avatarURL is null, we show a placeholder
function getAvatar(avatarURL) {
  return avatarURL ? avatarURL : 'https://via.placeholder.com/50'
}

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
    <nav className="nav" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {authedUser && (
        <>
          <Link to="/home">Home</Link>
          <Link to="/add">New Poll</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={user ? getAvatar(user.avatarURL) : 'https://via.placeholder.com/50'}
              alt={user ? `Avatar of ${user.name}` : 'Avatar'}
              width="30"
              height="30"
              style={{ borderRadius: '50%' }}
            />
            <span>Hello, {user && user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  )
}
