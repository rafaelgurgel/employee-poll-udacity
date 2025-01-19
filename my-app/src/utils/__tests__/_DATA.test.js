import {
  _saveQuestion,
  _saveQuestionAnswer
} from '../_DATA.js'

describe('_saveQuestion', () => {
  it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
    const questionData = {
      optionOneText: 'Use JavaScript',
      optionTwoText: 'Use TypeScript',
      author: 'sarahedo',
    }

    const result = await _saveQuestion(questionData)

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
  })

  it('should return an error if incorrect data is passed', async () => {
    const badAnswerData = {
      authedUser: '',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: '',
    }

    await expect(_saveQuestionAnswer(badAnswerData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    )
  })
})
