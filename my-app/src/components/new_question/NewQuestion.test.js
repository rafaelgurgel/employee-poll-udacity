import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import NewQuestion from './NewQuestion'
import '@testing-library/jest-dom'

const mockReducer = (state = {}) => state
const mockStore = createStore(mockReducer)

describe('NewQuestion Component', () => {
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

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
