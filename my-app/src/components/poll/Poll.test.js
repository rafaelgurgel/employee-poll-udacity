import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import Poll from './Poll'
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
  questions: {
    q1: {
      id: 'q1',
      author: 'sarahedo',
      optionOne: { votes: [], text: 'OptionOne' },
      optionTwo: { votes: [], text: 'OptionTwo' }
    },
  },
  users: {
    sarahedo: { id: 'sarahedo', name: 'Sarah Edo', avatarURL: null }
  }
}) => state

const mockStore = createStore(mockReducer)

describe('Poll Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Poll id="q1" />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
