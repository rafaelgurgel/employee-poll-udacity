import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Login from './Login'

// Minimal root reducer or a mock
const mockReducer = (state = { users: {} }) => state
const mockStore = createStore(mockReducer)

describe('Login Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('updates username input on change', () => {
    const { getByLabelText } = render(
      <Provider store={mockStore}>
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
    const customStore = createStore(() => ({ users: {} }))

    const { getByLabelText, getByText } = render(
      <Provider store={customStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    // Type in some username that doesn't exist
    const usernameInput = getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'someunknownuser' } })

    // Submit the form
    const button = getByText(/login/i)
    fireEvent.click(button)

    // Check for error message
    expect(getByText(/User does not exist./i)).toBeInTheDocument()
  })
})
