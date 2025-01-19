export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function addAnswer({ authedUser, qid, answer }) {
  if (!authedUser || !qid || !answer) {
    throw new Error('Missing required fields in addAnswer');
  }
  
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}
