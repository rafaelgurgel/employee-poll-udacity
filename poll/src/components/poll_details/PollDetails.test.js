import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import PollDetails from './PollDetails'
import '@testing-library/jest-dom'

// For useParams mocking (React Router v6). We can do a jest mock or pass it via context:
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'q1' }),
  useNavigate: () => jest.fn(),
}))

const mockReducer = (state = {
  authedUser: 'sarahedo',
  questions: {
    q1: {
      id: 'q1',
      author: 'sarahedo',
      optionOne: { votes: [], text: 'OptionOne' },
      optionTwo: { votes: ['sarahedo'], text: 'OptionTwo' }
    },
  },
  users: {
    sarahedo: { id: 'sarahedo', name: 'Sarah Edo', answers: { q1: 'optionTwo' }, avatarURL: null },
  }
}) => state

const mockStore = createStore(mockReducer)

describe('PollDetails Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PollDetails />
        </BrowserRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
