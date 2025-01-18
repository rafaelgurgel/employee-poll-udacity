import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Dashboard from './Dashboard'
import '@testing-library/jest-dom'

const mockReducer = (state = {
  authedUser: 'sarahedo',
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      answers: {},
    },
  },
  questions: {}
}) => state

const mockStore = createStore(mockReducer)

describe('Dashboard Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
