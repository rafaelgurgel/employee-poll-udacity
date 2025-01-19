// src/components/Dashboard.js
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Poll from '../poll/Poll'
import './dashboard.css'

export default function Dashboard() {
  const [showUnanswered, setShowUnanswered] = useState(true);
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const userAnswers = users[authedUser]?.answers || {};

  const answered = Object.keys(userAnswers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unanswered = Object.keys(questions)
    .filter((qid) => !answered.includes(qid))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-header">Dashboard</h3>

      <div className="dashboard-toggle">
        <button
          className={showUnanswered ? 'active' : ''}
          onClick={() => setShowUnanswered(true)}
        >
          Unanswered
        </button>
        <button
          className={!showUnanswered ? 'active' : ''}
          onClick={() => setShowUnanswered(false)}
        >
          Answered
        </button>
      </div>

      <ul className="dashboard-list">
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
            ))}
      </ul>
    </div>
  );
}

