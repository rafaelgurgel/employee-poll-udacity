import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions, addQuestion, addAnswer } from './questions'
import { setAuthedUser } from './authedUser'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
    })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
  }
}

export function handleAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const info = { authedUser, qid, answer }

    return saveQuestionAnswer(info)
      .then(() => dispatch(addAnswer(info)))
  }
}

export function handleSetAuthedUser(id) {
  return (dispatch) => {
    if (id === null) {
      // localStorage.removeItem('authedUser');
      dispatch({ type: 'LOGOUT_AUTHED_USER' });
    } else {
      // localStorage.setItem('authedUser', id);
      dispatch({ type: 'SET_AUTHED_USER', id });
    }
  };
}