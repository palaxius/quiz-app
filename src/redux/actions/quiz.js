import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISH_QUIZ, QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE, RETRY_QUIZ
} from "./actionTypes";

export function fetchQuizzes() {
  return async dispatch => {
    dispatch(fetchQuizzesStart())
    try {
      const quizzes = []
      await axios.get('quizzes.json').then(response => {
        Object.keys(response.data).forEach((key, index) => {
          quizzes.push({
            id: key,
            name: `Quiz №${index + 1}`
          })
        })

        dispatch(fetchQuizzesSuccess(quizzes))
      })
    } catch (error) {
      dispatch(fetchQuizzesError(error))
    }

  }
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START
  }
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    payload: quizzes
  }
}

export function fetchQuizzesError(error) {
  return {
    type: FETCH_QUIZZES_START,
    payload: error
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizzesStart())

    try {
        const response = await axios.get(`quizzes/${quizId}.json`)
        const quiz = response.data

        dispatch(fetchQuizSuccess(quiz))
    } catch (error) {
      dispatch(fetchQuizzesError(error))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
}
export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function  finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(activeQuestion) {
  return {
    type: QUIZ_NEXT_QUESTION,
    payload: activeQuestion
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }
    const question = state.quiz[state.activeQuestion]
    if (question.rightAnswerId === answerId) {
        if (!state.results[question.id]) {
          state.results[question.id] = 'success'
        }
      dispatch(quizSetState({[answerId]: 'success'}, state.results))
      setTimeout(() => {
        if (state.activeQuestion + 1 === state.quiz.length) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
      }, 1000)

    } else {
      state.results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, state.results))
    }
  }
}