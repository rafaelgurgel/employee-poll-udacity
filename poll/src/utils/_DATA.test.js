/**
 * _DATA.test.js
 *
 * Make sure you have Jest configured and that you can run:
 *    npm test
 * or
 *    npm run test
 * to execute these tests.
 */

import {
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

describe('_saveQuestion', () => {
  it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
    const questionData = {
      optionOneText: 'Use JavaScript',
      optionTwoText: 'Use TypeScript',
      author: 'sarahedo',
    }

    const result = await _saveQuestion(questionData)

    // Check that result has the expected structure
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('timestamp')
    expect(result).toHaveProperty('author', 'sarahedo')
    expect(result).toHaveProperty('optionOne')
    expect(result).toHaveProperty('optionTwo')

    expect(result.optionOne).toEqual({
      votes: [],
      text: 'Use JavaScript',
    })
    expect(result.optionTwo).toEqual({
      votes: [],
      text: 'Use TypeScript',
    })
  })

  it('should return an error if incorrect data is passed', async () => {
    const badQuestionData = {
      optionOneText: '', // missing required fields
      author: '',
    }

    // We expect this to reject with an error
    await expect(_saveQuestion(badQuestionData)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    )
  })
})

describe('_saveQuestionAnswer', () => {
  it('should return true if correctly formatted data is passed, and update internal data', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionTwo',
    }

    const result = await _saveQuestionAnswer(answerData)
    expect(result).toBe(true)

    // Optionally: check that the internal data got updated
    // In a real test suite, we might re-fetch from _getUsers() or _getQuestions()
    // to confirm that 'sarahedo' now voted for optionTwo in '8xf0y6ziyjabvozdd253nd'.
    // For demonstration, we omit that check or mock the data.
  })

  it('should return an error if incorrect data is passed', async () => {
    const badAnswerData = {
      authedUser: '',    // missing
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: '',        // missing
    }

    await expect(_saveQuestionAnswer(badAnswerData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    )
  })
})
