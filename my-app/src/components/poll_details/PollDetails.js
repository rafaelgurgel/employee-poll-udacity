import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { handleAnswer } from '../../actions/shared';
import getAvatar from '../../utils/getAvatar';

import './poll_details.css';

export default function PollDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { question, author, user } = useSelector((state) => {
    const question = state.questions[id];
    const author = question ? state.users[question.author] : null;
    const authedUser = state.authedUser;
    const user = authedUser ? state.users[authedUser] : null;
    return { question, author, user };
  });

  
  if (!question) {
    return <Navigate to="/notfound" />;
  }
  if (!author || !user) {
    return <p>Required data not found</p>;
  }

  const hasVotedFor = user.answers[id];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const handleVote = (answer) => {
    dispatch(handleAnswer(id, answer));
  };

  return (
    <div className="polldetails-container">
      <h3 className="polldetails-title">Poll by {author.name}</h3>
      <img
        src={getAvatar(author.avatarURL)}
        alt={`Avatar of ${author.name}`}
        className="polldetails-avatar"
      />

      <h4 className="polldetails-subtitle">Would You Rather...</h4>

      {hasVotedFor ? (
        <div>
          <div
            className="polldetails-results"
            style={
              hasVotedFor === 'optionOne'
                ? { fontWeight: 'bold', color: 'green' }
                : {}
            }
          >
            {question.optionOne.text}
            <br />
            {question.optionOne.votes.length} vote(s) (
            {((question.optionOne.votes.length / totalVotes) * 100).toFixed(2)}
            %)
          </div>
          <div
            className="polldetails-results"
            style={
              hasVotedFor === 'optionTwo'
                ? { fontWeight: 'bold', color: 'green' }
                : {}
            }
          >
            {question.optionTwo.text}
            <br />
            {question.optionTwo.votes.length} vote(s) (
            {((question.optionTwo.votes.length / totalVotes) * 100).toFixed(2)}
            %)
          </div>
        </div>
      ) : (
        <div className="polldetails-vote-buttons">
          <button onClick={() => handleVote('optionOne')}>
            {question.optionOne.text}
          </button>
          <button onClick={() => handleVote('optionTwo')}>
            {question.optionTwo.text}
          </button>
        </div>
      )}

      <br />
      <button
        className="polldetails-back"
        onClick={() => navigate('/home')}
      >
        Back
      </button>
    </div>
  );
}
