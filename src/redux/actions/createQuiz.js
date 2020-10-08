import {CREATE_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUESTION,
    payload: item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post('quizzes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
    setTimeout(() => {
      window.location.href = '/';
    }, 1000)
  }
}
