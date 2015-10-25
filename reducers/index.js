import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import geolocation from './geolocation';
import checkinsByFilter from './checkinsByFilter';

import { MODE, SWITCH_DISPLAY_MODE } from '../actions'

function home(state={mode: MODE.list}, action){
  switch(action.type) {
    case SWITCH_DISPLAY_MODE:
      return Object.assign({}, state, {mode: action.mode})
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  checkinsByFilter,
  geolocation,
  home,
  router
});

export default rootReducer;
