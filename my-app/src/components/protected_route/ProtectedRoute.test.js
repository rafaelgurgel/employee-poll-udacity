import React from 'react'
import { render } from '@testing-library/react'
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import '@testing-library/jest-dom'

function MockComponent() {
  return <div>Mock Child Content</div>
}

describe('ProtectedRoute Component', () => {
  it('matches snapshot when user is authenticated', () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route
          path="/"
          element={
            <ProtectedRoute authedUser="sarahedo">
              <MockComponent />
            </ProtectedRoute>
          }
        />
      ),
      {
        future: {
          v7_startTransition: true,
        },
      }
    )

    const { asFragment } = render(<RouterProvider router={router} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot when user is not authenticated', () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route
          path="/"
          element={
            <ProtectedRoute authedUser={null}>
              <MockComponent />
            </ProtectedRoute>
          }
        />
      ),
      {
        future: {
          v7_startTransition: true,
        },
      }
    )

    const { asFragment } = render(<RouterProvider router={router} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
