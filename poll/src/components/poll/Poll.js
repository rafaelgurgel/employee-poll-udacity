// src/components/Poll.js
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import getAvatar from '../../utils/getAvatar'

import './poll.css'

export default function Poll({ id }) {
  const { question, author } = useSelector((state) => {
    const question = state.questions[id]
    const author = question ? state.users[question.author] : null
    return { question, author }
  })

  if (!question) {
    return <p>This question doesn't exist</p>
  }

  if (!author) {
    return <p>Author not found</p>
  }

  return (
    <div className="poll-container">
      <div className="poll-header">
        <img
          src={getAvatar(author.avatarURL)}
          alt={`Avatar of ${author.name}`}
          className="poll-avatar"
        />
        <h4>{author.name} asks:</h4>
      </div>
      <p className="poll-content">
        Would you rather <strong>{question.optionOne.text}</strong> or ...
      </p>
      <Link to={`/questions/${id}`} className="poll-link">
        View Poll
      </Link>
    </div>
  )
}
