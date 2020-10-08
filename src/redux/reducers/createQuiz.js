import {CREATE_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
  quiz: []
}

export function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: []
      }
    default:
      return state
  }
}