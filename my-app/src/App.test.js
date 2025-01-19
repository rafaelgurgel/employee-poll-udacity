import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import '@testing-library/jest-dom'

// Mock reducer
const mockReducer = (state = {
  authedUser: 'sarahedo',
  users: {
    sarahedo: { id: 'sarahedo', name: 'Sarah Edo', answers: { q1: 'optionOne' }, avatarURL: null },
  },
  questions: {
    q1: {
      id: 'q1',
      author: 'sarahedo',
      optionOne: { votes: ['sarahedo'], text: 'Option 1' },
      optionTwo: { votes: [], text: 'Option 2' },
    },
  },
}) => state

const mockStore = configureStore({
  reducer: mockReducer,
})

describe('App Component', () => {
  it('renders the PollDetails page for authenticated users', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/questions/q1']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(getByText(/option 1/i)).toBeInTheDocument() // Assuming this text is in PollDetails
  })
})
