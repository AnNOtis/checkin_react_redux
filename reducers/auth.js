import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_AUTH
} from '../actions';

export default function auth(state = { errorMessage: null }, action) {
  switch (action.type) {
  // case LOGIN_START:
  //   return Object.assign({}, state, { errorMessage: null });
  case LOGIN_FAILED:
    return Object.assign({}, state, { errorMessage: action.errors });
  case LOGIN_SUCCESS:
    return Object.assign({}, state, { user: action.response, errorMessage: null });
  case SET_AUTH:
    return action.auth;
  default:
    return state;
  }
}
