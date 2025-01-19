import { combineReducers } from 'redux';
import authedUser from '../authedUser';
import users from '../users';
import questions from '../questions';
import rootReducer from '../index';

describe('rootReducer', () => {
  it('should initialize with default state from all reducers', () => {
    const state = rootReducer(undefined, {});
    expect(state).toEqual({
      authedUser: null,
      users: {},
      questions: {},
    });
  });

  it('should handle actions dispatched to authedUser reducer', () => {
    const action = { type: 'SET_AUTHED_USER', id: 'user123' };
    const state = rootReducer(undefined, action);
    expect(state.authedUser).toBe('user123');
  });

  it('should handle actions dispatched to users reducer', () => {
    const users = { user1: { id: 'user1', name: 'User One' } };
    const action = { type: 'RECEIVE_USERS', users };
    const state = rootReducer(undefined, action);
    expect(state.users).toEqual(users);
  });

  it('should handle actions dispatched to questions reducer', () => {
    const questions = { q1: { id: 'q1', text: 'Sample Question' } };
    const action = { type: 'RECEIVE_QUESTIONS', questions };
    const state = rootReducer(undefined, action);
    expect(state.questions).toEqual(questions);
  });

  it('should return the current state for unknown actions', () => {
    const initialState = {
      authedUser: 'user123',
      users: { user1: { id: 'user1', name: 'User One' } },
      questions: { q1: { id: 'q1', text: 'Sample Question' } },
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
