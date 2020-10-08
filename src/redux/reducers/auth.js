import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
  token: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.payload
      }
      case AUTH_LOGOUT:
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationDate')
      return {
        ...state, token: null
      }
    default:
      return state
  }
}