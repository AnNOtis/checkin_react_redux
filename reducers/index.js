import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import geolocation from './geolocation';
import checkinsByFilter from './checkinsByFilter';
import auth from './auth';
import signupForm from './signupForm';
import checkinForm from './checkinForm';

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
  home,
  checkinsByFilter,
  geolocation,
  auth,
  signupForm,
  checkinForm,
  form: formReducer,
  router
});

export default rootReducer;
