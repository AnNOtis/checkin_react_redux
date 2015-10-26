import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_AUTH
} from '../actions';

export default function auth(state = {}, action) {
  switch (action.type) {
  // case LOGIN_START:
  //   return Object.assign({}, state, { errorMessage: null });
  case LOGIN_FAILED:
    return Object.assign({}, state, { errorMessage: action.errors });
  case LOGIN_SUCCESS:
    return Object.assign(
      {},
      state,
      { user: action.response.user, deviceToken: action.response.deviceToken, errorMessage: null }
    );
  case LOGOUT:
    return {};
  case SET_AUTH:
    return action.auth;
  default:
    return state;
  }
}
