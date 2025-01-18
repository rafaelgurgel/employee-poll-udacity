import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { useNavigate } from 'react-router-dom'

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
    <div style={{ marginTop: '2rem' }}>
      <h3>Create New Question</h3>
      <form onSubmit={handleSubmit}>
        <label>Would you rather...</label>
        <input
          type="text"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
          placeholder="Option One"
          required
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <h4 style={{ margin: 0 }}>OR</h4>
        <input
          type="text"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
          placeholder="Option Two"
          required
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
