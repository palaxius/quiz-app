import {combineReducers} from "redux";
import quizReducer from "./quiz";
import {createReducer} from "./createQuiz";
import authReducer from "./auth";

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
})