import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { handleAnswer } from '../actions/shared'

function getAvatar(avatarURL) {
  return avatarURL ? avatarURL : 'https://via.placeholder.com/50'
}

export default function PollDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { question, author, user, authedUser } = useSelector((state) => {
    const question = state.questions[id];
    const author = question ? state.users[question.author] : null;
    const authedUser = state.authedUser;
    const user = authedUser ? state.users[authedUser] : null;
    return { question, author, user, authedUser };
  });

  if (!question) {
    return <p>404 - Poll not found</p>;
  }

  if (!author || !user) {
    return <p>Required data not found</p>;
  }

  const hasVotedFor = user.answers[id];
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

  const handleVote = (answer) => {
    dispatch(handleAnswer(id, answer));
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Poll by {author.name}</h3>
      <img
        src={getAvatar(author.avatarURL)}
        alt={`Avatar of ${author.name}`}
        width="50"
        height="50"
        style={{ borderRadius: '50%' }}
      />
      <h4>Would You Rather...</h4>
      {hasVotedFor ? (
        <div>
          <div
            style={
              hasVotedFor === 'optionOne'
                ? { fontWeight: 'bold', color: 'green' }
                : {}
            }
          >
            {question.optionOne.text} <br />
            {question.optionOne.votes.length} vote(s) (
            {((question.optionOne.votes.length / totalVotes) * 100).toFixed(2)}%)
          </div>
          <hr />
          <div
            style={
              hasVotedFor === 'optionTwo'
                ? { fontWeight: 'bold', color: 'green' }
                : {}
            }
          >
            {question.optionTwo.text} <br />
            {question.optionTwo.votes.length} vote(s) (
            {((question.optionTwo.votes.length / totalVotes) * 100).toFixed(2)}%)
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => handleVote('optionOne')}>
            {question.optionOne.text}
          </button>
          <button onClick={() => handleVote('optionTwo')}>
            {question.optionTwo.text}
          </button>
        </div>
      )}
      <br />
      <button onClick={() => navigate('/home')}>Back</button>
    </div>
  );
}
