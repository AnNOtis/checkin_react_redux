import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
// import {
//   SET_DISTANCE_FILTER,
//   LOAD_CHECKINS
// } from '../actions';

import geolocation from './geolocation';

// const initialState = {
//   distanceFilter: 50,
//   checkins: []
// };
//
// function checkinApp(state = initialState, action) {
//   switch (action.type) {
//   case SET_DISTANCE_FILTER:
//     return merge({}, state, {
//       distanceFilter: action.filter
//     });
//   case LOAD_CHECKINS:
//     return merge({}, state, {
//       checkins: action.checkins
//     });
//   default:
//     return state;
//   }
// }

const rootReducer = combineReducers({
  geolocation,
  router
});

export default rootReducer;
