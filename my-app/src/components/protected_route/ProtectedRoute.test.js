import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import '@testing-library/jest-dom';

function MockComponent() {
  return <div>Mock Child Content</div>;
}

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (!message.includes('React.startTransition')) {
      console.warn(message);
    }
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('ProtectedRoute Component', () => {
  it('renders the child component when user is authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
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
      </MemoryRouter>
    );

    expect(getByText(/Mock Child Content/i)).toBeInTheDocument();
  });

  it('redirects to the login page when user is not authenticated', () => {
    const { queryByText, container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute authedUser={null}>
                <MockComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(queryByText(/Mock Child Content/i)).not.toBeInTheDocument();

    expect(container).toHaveTextContent(/Login Page/i);
  });
});
