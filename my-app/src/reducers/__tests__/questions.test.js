import questionsReducer from '../questions';
import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from '../../actions/questions';

describe('questions reducer', () => {
  it('should return the initial state when no action is provided', () => {
    const state = questionsReducer(undefined, {});
    expect(state).toEqual({});
  });

  it('should handle RECEIVE_QUESTIONS', () => {
    const initialState = {};
    const questions = {
      q1: { id: 'q1', text: 'Question 1' },
      q2: { id: 'q2', text: 'Question 2' },
    };
    const action = {
      type: RECEIVE_QUESTIONS,
      questions,
    };

    const state = questionsReducer(initialState, action);
    expect(state).toEqual(questions);
  });

  it('should handle ADD_QUESTION', () => {
    const initialState = {
      q1: { id: 'q1', text: 'Question 1' },
    };
    const newQuestion = {
      id: 'q2',
      text: 'New Question',
    };
    const action = {
      type: ADD_QUESTION,
      question: newQuestion,
    };

    const state = questionsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      q2: newQuestion,
    });
  });

  it('should handle ADD_ANSWER', () => {
    const initialState = {
      q1: {
        id: 'q1',
        optionOne: {
          text: 'Option One',
          votes: ['user1'],
        },
        optionTwo: {
          text: 'Option Two',
          votes: [],
        },
      },
    };

    const action = {
      type: ADD_ANSWER,
      authedUser: 'user2',
      qid: 'q1',
      answer: 'optionOne',
    };

    const state = questionsReducer(initialState, action);
    expect(state).toEqual({
      q1: {
        id: 'q1',
        optionOne: {
          text: 'Option One',
          votes: ['user1', 'user2'], // user2 is added to votes
        },
        optionTwo: {
          text: 'Option Two',
          votes: [],
        },
      },
    });
  });

  it('should not modify state for unknown actions', () => {
    const initialState = {
      q1: { id: 'q1', text: 'Question 1' },
    };
    const action = { type: 'UNKNOWN_ACTION' };

    const state = questionsReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
