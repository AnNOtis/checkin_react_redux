import {
  CHECKIN_START,
  CHECKIN_FAILED,
  CHECKIN_SUCCESS,
  PREVIEW_CHECKIN_PHOTO
} from '../actions';

export default function checkinForm(state = {}, action) {
  switch (action.type) {
  case CHECKIN_FAILED:
    return Object.assign({}, state, { errorMessage: action.errors });
  case CHECKIN_SUCCESS:
    return {};
  case PREVIEW_CHECKIN_PHOTO:
    return Object.assign({}, state, { previewPhoto: action.previewPhoto });
  default:
    return state;
  }
}
