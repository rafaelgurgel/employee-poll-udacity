import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'
import '@testing-library/jest-dom'

const mockReducer = (state = {
  authedUser: 'sarahedo',
  users: {
    sarahedo: { id: 'sarahedo', name: 'Sarah Edo', avatarURL: null },
  }
}) => state

const mockStore = createStore(mockReducer)

describe('Nav Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
