import {
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from '../actions';

export default function signupForm(state = {}, action) {
  switch (action.type) {
  case SIGNUP_FAILED:
    return { errorMessage: action.errors };
  case SIGNUP_SUCCESS:
    return {};
  default:
    return state;
  }
}
