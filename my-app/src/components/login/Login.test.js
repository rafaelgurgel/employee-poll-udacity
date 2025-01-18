// src/components/login/Login.test.js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Login from './Login'
import {
  SET_AUTHED_USER,
  LOGOUT_AUTHED_USER,
} from '../../actions/authedUser'

// ----------------------
// Minimal test reducer
// that handles the actions.
// ----------------------
function testReducer(
  state = {
    users: {
      // Provide at least one valid user for login
      sarahedo: { password: 'abc', name: 'Sarah Edo' },
      johndoe: { password: 'xyz', name: 'John Doe' },
    },
    authedUser: null,
  },
  action
) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        authedUser: action.id,
      }
    case LOGOUT_AUTHED_USER:
      return {
        ...state,
        authedUser: null,
      }
    default:
      return state
  }
}

describe('Login Component', () => {
  it('matches snapshot', () => {
    const store = createStore(testReducer)
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('updates username input on change', () => {
    const store = createStore(testReducer)
    const { getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const usernameInput = getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'sarahedo' } })
    expect(usernameInput.value).toBe('sarahedo')
  })

  it('shows error if user does not exist', () => {
    // We'll pass a store with an empty "users" object
    const customStore = createStore(() => ({ users: {}, authedUser: null }))

    const { getByLabelText, getByText, getByRole } = render(
      <Provider store={customStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const usernameInput = getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'someunknownuser' } })

    const loginButton = getByRole('button', { name: /login/i })
    fireEvent.click(loginButton)

    expect(getByText(/User does not exist./i)).toBeInTheDocument()
  })

  // --------------------------------
  // NEW: Test that user is removed (authedUser = null) on logout
  // --------------------------------
  it('removes the user (authedUser) from Redux after logout', () => {
    // Preload store with a logged-in user
    const preloadedState = {
      users: {
        sarahedo: { password: 'abc' },
      },
      authedUser: 'sarahedo',
    }
    const store = createStore(testReducer, preloadedState)

    // You might have a separate "Logout" button somewhere in the app.
    // For this test, we'll directly dispatch the logout action:
    store.dispatch({ type: LOGOUT_AUTHED_USER })

    // Now check that authedUser is null
    const state = store.getState()
    expect(state.authedUser).toBeNull()
  })
})
