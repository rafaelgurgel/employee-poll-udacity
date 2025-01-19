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

function testReducer(
  state = {
    users: {
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

  it('redirects to /home if a user is already logged in', () => {
    const preloadedState = {
      users: {
        sarahedo: { password: 'abc', name: 'Sarah Edo' },
      },
      authedUser: 'sarahedo',
    };
    const store = createStore(testReducer, preloadedState);

    const { queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(queryByText(/Employee Polls Login/i)).not.toBeInTheDocument();
  });

 
  it('removes the user (authedUser) from Redux after logout', () => {
    const preloadedState = {
      users: {
        sarahedo: { password: 'abc' },
      },
      authedUser: 'sarahedo',
    }
    const store = createStore(testReducer, preloadedState)

    store.dispatch({ type: LOGOUT_AUTHED_USER })

    const state = store.getState()
    expect(state.authedUser).toBeNull()
  })
})
