import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, createRoutesFromElements, Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Nav from './Nav'
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
  authedUser: 'sarahedo',
  users: {
    sarahedo: { id: 'sarahedo', name: 'Sarah Edo', avatarURL: null },
  }
}) => state

const mockStore = createStore(mockReducer)

describe('Nav Component', () => {
  it('matches snapshot', () => {
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<Nav />} />),
      {
        future: {
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        },
      }
    )

    const { asFragment } = render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
