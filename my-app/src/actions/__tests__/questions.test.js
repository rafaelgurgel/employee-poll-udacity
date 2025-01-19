import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER,
  receiveQuestions,
  addQuestion,
  addAnswer,
} from '../questions';

describe('questions actions', () => {
  describe('receiveQuestions', () => {
    it('should create an action to receive questions', () => {
      const questions = {
        q1: { id: 'q1', text: 'Question 1' },
        q2: { id: 'q2', text: 'Question 2' },
      };
      const expectedAction = {
        type: RECEIVE_QUESTIONS,
        questions,
      };

      const action = receiveQuestions(questions);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('addQuestion', () => {
    it('should create an action to add a question', () => {
      const question = {
        id: 'q3',
        text: 'New Question',
        author: 'user1',
        timestamp: 1234567890,
      };
      const expectedAction = {
        type: ADD_QUESTION,
        question,
      };

      const action = addQuestion(question);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('addAnswer', () => {
    it('should create an action to add an answer', () => {
      const answerData = {
        authedUser: 'user1',
        qid: 'q1',
        answer: 'optionOne',
      };
      const expectedAction = {
        type: ADD_ANSWER,
        ...answerData,
      };

      const action = addAnswer(answerData);
      expect(action).toEqual(expectedAction);
    });

    it('should handle missing fields gracefully', () => {
      const answerData = {
        authedUser: 'user1',
        qid: 'q1',
      };
      expect(() => addAnswer(answerData)).toThrow();
    });
  });
});
