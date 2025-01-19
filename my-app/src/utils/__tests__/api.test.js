import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer,
} from '../api';
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../_DATA';

jest.mock('../_DATA');

describe('API utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInitialData', () => {
    it('should fetch users and questions and return them as an object', async () => {
      const mockUsers = { user1: { id: 'user1', name: 'User One' } };
      const mockQuestions = { q1: { id: 'q1', text: 'Question 1' } };

      _getUsers.mockResolvedValue(mockUsers);
      _getQuestions.mockResolvedValue(mockQuestions);

      const data = await getInitialData();

      expect(_getUsers).toHaveBeenCalledTimes(1);
      expect(_getQuestions).toHaveBeenCalledTimes(1);
      expect(data).toEqual({
        users: mockUsers,
        questions: mockQuestions,
      });
    });

    it('should handle errors from _getUsers or _getQuestions', async () => {
      _getUsers.mockRejectedValue(new Error('Failed to fetch users'));
      _getQuestions.mockResolvedValue({});

      await expect(getInitialData()).rejects.toThrow('Failed to fetch users');
      expect(_getUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveQuestion', () => {
    it('should call _saveQuestion with the correct parameters', async () => {
      const mockQuestion = {
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'user1',
      };
      const mockResponse = { id: 'q1', ...mockQuestion };

      _saveQuestion.mockResolvedValue(mockResponse);

      const response = await saveQuestion(mockQuestion);

      expect(_saveQuestion).toHaveBeenCalledWith(mockQuestion);
      expect(response).toEqual(mockResponse);
    });

    it('should handle errors from _saveQuestion', async () => {
      const mockQuestion = {
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'user1',
      };

      _saveQuestion.mockRejectedValue(new Error('Failed to save question'));

      await expect(saveQuestion(mockQuestion)).rejects.toThrow(
        'Failed to save question'
      );
    });
  });

  describe('saveQuestionAnswer', () => {
    it('should call _saveQuestionAnswer with the correct parameters', async () => {
      const mockAnswerInfo = {
        authedUser: 'user1',
        qid: 'q1',
        answer: 'optionOne',
      };

      _saveQuestionAnswer.mockResolvedValue();

      await saveQuestionAnswer(mockAnswerInfo);

      expect(_saveQuestionAnswer).toHaveBeenCalledWith(mockAnswerInfo);
    });

    it('should handle errors from _saveQuestionAnswer', async () => {
      const mockAnswerInfo = {
        authedUser: 'user1',
        qid: 'q1',
        answer: 'optionOne',
      };

      _saveQuestionAnswer.mockRejectedValue(
        new Error('Failed to save answer')
      );

      await expect(saveQuestionAnswer(mockAnswerInfo)).rejects.toThrow(
        'Failed to save answer'
      );
    });
  });
});
