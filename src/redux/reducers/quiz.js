import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_QUIZ
} from "../actions/actionTypes";

const initialState = {
  quizzes: [],
  loading: false,
  error: null,

  quiz: null,
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  results: {}
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: action.payload
      }
    case FETCH_QUIZZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.payload
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.payload,
        answerState: null
      }
    case RETRY_QUIZ:
      return {
        ...state,
        isFinished: false,
        results: {},
        activeQuestion: 0,
        answerState: null
      }
    default:
      return state
  }
}