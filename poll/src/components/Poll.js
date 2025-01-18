import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function getAvatar(avatarURL) {
  return avatarURL ? avatarURL : 'https://via.placeholder.com/50'
}

export default function Poll({ id }) {
  const { question, author } = useSelector((state) => {
    const question = state.questions[id];
    const author = question ? state.users[question.author] : null;
    return { question, author };
  });

  if (!question) {
    return <p>This question doesn't exist</p>;
  }

  if (!author) {
    return <p>Author not found</p>;
  }

  return (
    <div className="poll" style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={getAvatar(author.avatarURL)}
          alt={`Avatar of ${author.name}`}
          width="40"
          height="40"
          style={{ borderRadius: '50%' }}
        />
        <h4>{author.name} asks:</h4>
      </div>
      <p style={{ marginTop: '1rem' }}>
        Would you rather <strong>{question.optionOne.text}</strong> or ...
      </p>
      <Link to={`/questions/${id}`}>View Poll</Link>
    </div>
  );
}
