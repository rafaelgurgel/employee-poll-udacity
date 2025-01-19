import usersReducer from '../users';
import { RECEIVE_USERS } from '../../actions/users';
import { ADD_QUESTION, ADD_ANSWER } from '../../actions/questions';

describe('users reducer', () => {
  it('should return the initial state when no action is provided', () => {
    const state = usersReducer(undefined, {});
    expect(state).toEqual({});
  });

  it('should handle RECEIVE_USERS', () => {
    const initialState = {};
    const users = {
      user1: {
        id: 'user1',
        name: 'User One',
        questions: [],
        answers: {},
      },
      user2: {
        id: 'user2',
        name: 'User Two',
        questions: [],
        answers: {},
      },
    };

    const action = {
      type: RECEIVE_USERS,
      users,
    };

    const state = usersReducer(initialState, action);
    expect(state).toEqual(users);
  });

  it('should handle ADD_QUESTION', () => {
    const initialState = {
      user1: {
        id: 'user1',
        name: 'User One',
        questions: ['q1'],
        answers: {},
      },
    };

    const newQuestion = {
      id: 'q2',
      author: 'user1',
    };

    const action = {
      type: ADD_QUESTION,
      question: newQuestion,
    };

    const state = usersReducer(initialState, action);
    expect(state).toEqual({
      user1: {
        id: 'user1',
        name: 'User One',
        questions: ['q1', 'q2'], // q2 is added to the list of questions
        answers: {},
      },
    });
  });

  it('should handle ADD_ANSWER', () => {
    const initialState = {
      user1: {
        id: 'user1',
        name: 'User One',
        questions: ['q1'],
        answers: {
          q1: 'optionOne',
        },
      },
    };

    const action = {
      type: ADD_ANSWER,
      authedUser: 'user1',
      qid: 'q2',
      answer: 'optionTwo',
    };

    const state = usersReducer(initialState, action);
    expect(state).toEqual({
      user1: {
        id: 'user1',
        name: 'User One',
        questions: ['q1'],
        answers: {
          q1: 'optionOne',
          q2: 'optionTwo', // New answer added
        },
      },
    });
  });

  it('should not modify state for unknown actions', () => {
    const initialState = {
      user1: {
        id: 'user1',
        name: 'User One',
        questions: ['q1'],
        answers: {},
      },
    };

    const action = { type: 'UNKNOWN_ACTION' };

    const state = usersReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
