import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@testing-library/jest-dom'

// Minimal mock reducer
const mockReducer = (state = { authedUser: null, users: {}, questions: {} }) => state
const mockStore = createStore(mockReducer)

describe('App Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
