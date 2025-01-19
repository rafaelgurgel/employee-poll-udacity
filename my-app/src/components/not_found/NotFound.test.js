import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';
import '@testing-library/jest-dom';

const mockReducer = (state = {}) => state; // Mock reducer

const mockStore = configureStore({
  reducer: mockReducer,
});

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

describe('NotFound Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true, // Enable startTransition future flag
          }}
        >
          <NotFound />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
