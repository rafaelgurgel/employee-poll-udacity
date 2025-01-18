// src/components/Leaderboard.js
import React from 'react'
import { useSelector } from 'react-redux'
import './leaderboard.css'

function getAvatar(avatarURL) {
  return avatarURL ? avatarURL : 'https://via.placeholder.com/50'
}

export default function Leaderboard() {
  const users = useSelector((state) => state.users)
  const leaderboard = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      questionsCount: user.questions.length,
      answersCount: Object.keys(user.answers).length,
    }))
    .sort((a, b) => (b.questionsCount + b.answersCount) - (a.questionsCount + a.answersCount))

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-title">Leaderboard</h3>

      <ul className="leaderboard-list">
        {leaderboard.map((u) => (
          <li key={u.id} className="leaderboard-item">
            <div className="leaderboard-item-content">
              <img
                src={getAvatar(u.avatarURL)}
                alt={`Avatar of ${u.name}`}
                className="leaderboard-avatar"
              />
              <div className="leaderboard-user-details">
                <h4>{u.name}</h4>
                <p>Questions Asked: {u.questionsCount}</p>
                <p>Questions Answered: {u.answersCount}</p>
                <p>Total: {u.questionsCount + u.answersCount}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
