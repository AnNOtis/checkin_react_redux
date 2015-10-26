import fetch from 'isomorphic-fetch';
import apiClient from '../libs/apiClient';
import { isEmpty } from 'lodash';
import storage from 'store';

export const FETCH_CHECKINS_START = 'FETCH_CHECKINS_START';
export const FETCH_CHECKINS_SUCCESS = 'FETCH_CHECKINS_SUCCESS';
export const FETCH_CHECKINS_FAILED = 'FETCH_CHECKINS_FAILED';
export const LOAD_CHECKINS = 'LOAD_CHECKINS';

export function fetchCheckinsStart(radius, position) {
  return {
    type: FETCH_CHECKINS_START,
    radius,
    position
  }
}

export function fetchCheckinsSuccess(response) {
  return {
    type: FETCH_CHECKINS_SUCCESS,
    checkins: response.checkins
  }
}

export function fetchCheckinsFailed(error) {
  return {
    type: FETCH_CHECKINS_FAILED,
    error
  }
}

export function fetchCheckinsByFilter() {
  return function (dispatch, getState) {
    const { geolocation, checkinsByFilter } = getState();
    const radius = checkinsByFilter.distanceFilter;
    const position = geolocation.current;

    dispatch(fetchCheckinsStart(radius));

    const query = `?radius=${radius}&lat=${position.lat}&lng=${position.lng}`;
    return apiClient(`checkins${query}`)
      .then(json => {
        dispatch(fetchCheckinsSuccess(json))
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchCheckinsFailed(error));
      });
  };
}

export const SET_DISTANCE_FILTER = 'SET_DISTANCE_FILTER';

export function setDistanceFilter(filter) {
  return {
    type: SET_DISTANCE_FILTER,
    filter
  };
}

export function loadCheckins(checkins) {
  return {
    type: LOAD_CHECKINS,
    checkins
  }
}

export const REQUEST_CURRENT_LOCATION = 'REQUEST_CURRENT_LOCATION';
export const REQUEST_CURRENT_LOCATION_SUCCESS = 'REQUEST_CURRENT_LOCATION_SUCCESS';
export const REQUEST_CURRENT_LOCATION_FAILURE = 'REQUEST_CURRENT_LOCATION_FAILURE';

export function requestCurrentLocation() {
  return {
    type: REQUEST_CURRENT_LOCATION
  };
}
export function requestCurrentLocationSuccess(response) {
  return {
    type: REQUEST_CURRENT_LOCATION_SUCCESS,
    response: response
  };
}
export function requestCurrentLocationFailed(error) {
  return {
    type: REQUEST_CURRENT_LOCATION_FAILURE,
    error
  };
}

export function requestLocationPermission(dispatch) {
  return dispatch => {
    if (!navigator.geolocation){
      dispatch(requestCurrentLocationFailed());
    } else {
      dispatch( (dispatch) => {
          dispatch(requestCurrentLocation());
          navigator.geolocation.getCurrentPosition(
            position => { dispatch(requestCurrentLocationSuccess(position)) },
            error => { dispatch(requestCurrentLocationFailed(error)) }
          );
        }
      )
    }
  };
}

export const MODE = {
  MAP: 'map',
  LIST: 'list'
}

export const SWITCH_DISPLAY_MODE = 'SWITCH_DISPLAY_MODE';
export function switchDisplayMode(mode){
  return {
    type: SWITCH_DISPLAY_MODE,
    mode
  }
}

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH = 'SET_AUTH';
export function loginStart(data){
  return {
    type: LOGIN_START,
    data
  };
}

export function loginFailed(response){
  return {
    type: LOGIN_FAILED,
    errors: response.errors
  };
}

export function loginSuccess(response){
  storage.set('auth', response);
  return {
    type: LOGIN_SUCCESS,
    response
  };
}

export function setAuth(auth){
  return {
    type: SET_AUTH,
    auth
  };
}

export function logout(){
  storage.remove('auth')
  return {
    type: LOGOUT
  };
}

export function loadStorageAuth(){
  return function (dispatch, getState){
    const storateAuth = storage.get('auth')
    if(!isEmpty(storateAuth)){
      return dispatch(setAuth(storateAuth));
    }
  }
}

export function login(data){
  return function (dispatch, getState) {
    dispatch(loginStart(data));

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    return apiClient(
        'users/login',
        {
          method: 'POST',
          body: formData
        }
      )
      .then(json => {
        dispatch(loginSuccess(json))
      })
      .catch(error => {
        console.warn(error);
        dispatch(loginFailed(error));
      });
  };
}
