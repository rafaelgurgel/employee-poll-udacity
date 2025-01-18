import React from 'react'
import { useSelector } from 'react-redux'

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
    <div>
      <h3>Leaderboard</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {leaderboard.map((u) => (
          <li key={u.id} className="leaderboard-item" style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={getAvatar(u.avatarURL)}
                alt={`Avatar of ${u.name}`}
                width="50"
                height="50"
                style={{ borderRadius: '50%' }}
              />
              <div>
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
