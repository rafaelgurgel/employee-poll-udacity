import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Poll from './Poll'

export default function Dashboard() {
  const [showUnanswered, setShowUnanswered] = useState(true)
  const authedUser = useSelector((state) => state.authedUser)
  const questions = useSelector((state) => state.questions)
  const userAnswers = useSelector((state) => state.users[authedUser].answers)

  // QIDs that the user has answered
  const answered = Object.keys(userAnswers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  // Filter out answered to get unanswered
  const unanswered = Object.keys(questions)
    .filter((qid) => !answered.includes(qid))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <button
          style={{ fontWeight: showUnanswered ? 'bold' : 'normal' }}
          onClick={() => setShowUnanswered(true)}
        >
          Unanswered
        </button>
        <button
          style={{ fontWeight: !showUnanswered ? 'bold' : 'normal' }}
          onClick={() => setShowUnanswered(false)}
        >
          Answered
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {showUnanswered
          ? unanswered.map((id) => (
              <li key={id}>
                <Poll id={id} />
              </li>
            ))
          : answered.map((id) => (
              <li key={id}>
                <Poll id={id} />
              </li>
            ))
        }
      </ul>
    </div>
  )
}
