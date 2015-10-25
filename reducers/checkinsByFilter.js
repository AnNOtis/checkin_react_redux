import merge from 'lodash/object/merge';
import {
  FETCH_CHECKINS_START,
  FETCH_CHECKINS_SUCCESS,
  FETCH_CHECKINS_FAILED,
  LOAD_CHECKINS,
  SET_DISTANCE_FILTER
} from '../actions';


const initialState = {
  isFetching: false,
  distanceFilter: 50,
  checkins: []
};

export default function checkinsByFilter(state = initialState, action) {
  switch (action.type) {
  case FETCH_CHECKINS_START:
    return merge({}, state, {
      isFetching: true,
    });
  case FETCH_CHECKINS_SUCCESS:
    return merge({}, state, {
      isFetching: false,
      checkins: action.checkins
    });
  case FETCH_CHECKINS_FAILED:
    return merge({}, state, {
      isFetching: false,
      error: action.error
    });
  case SET_DISTANCE_FILTER:
    return merge({}, state, {
      distanceFilter: action.filter
    });
  case LOAD_CHECKINS:
    return merge({}, state, {
      checkins: action.checkins
    });
  default:
    return state;
  }
}
