import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import '@testing-library/jest-dom'

function MockComponent() {
  return <div>Mock Child Content</div>
}

describe('ProtectedRoute Component', () => {
  it('matches snapshot when user is authenticated', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute authedUser="sarahedo">
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot when user is not authenticated', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute authedUser={null}>
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
