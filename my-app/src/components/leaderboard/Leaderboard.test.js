import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Leaderboard from './LeaderBoard'
import '@testing-library/jest-dom'

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (!message.includes('React.startTransition')) {
      console.warn(message)
    }
  })
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockReducer = (state = {
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      questions: ['q1', 'q2'],
      answers: { q3: 'optionOne' },
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      questions: ['q3'],
      answers: { q1: 'optionTwo' },
    },
  },
}) => state

const mockStore = createStore(mockReducer)

describe('Leaderboard Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <Leaderboard />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
