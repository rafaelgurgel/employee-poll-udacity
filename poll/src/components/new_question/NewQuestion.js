// src/components/NewQuestion.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleAddQuestion } from '../../actions/shared'
import { useNavigate } from 'react-router-dom'
import './new_question.css'

export default function NewQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleAddQuestion(optionOne, optionTwo))
      .then(() => {
        setOptionOne('')
        setOptionTwo('')
        navigate('/home')
      })
  }

  return (
    <div className="new-question-container">
      <h3 className="new-question-title">Create New Question</h3>
      <form className="new-question-form" onSubmit={handleSubmit}>
        <label>Would you rather...</label>
        <input
          type="text"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
          placeholder="Option One"
          required
          className="new-question-input"
        />

        <h4 className="new-question-or">OR</h4>

        <input
          type="text"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
          placeholder="Option Two"
          required
          className="new-question-input"
        />

        <button type="submit" className="new-question-submit">
          Submit
        </button>
      </form>
    </div>
  )
}
