import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Poll from './Poll'
import '@testing-library/jest-dom'

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
        <Poll id="q1" />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
