import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import geolocation from './geolocation';
import checkinsByFilter from './checkinsByFilter';

const rootReducer = combineReducers({
  checkinsByFilter,
  geolocation,
  router
});

export default rootReducer;
