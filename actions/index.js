import fetch from 'isomorphic-fetch';
import apiClient from '../libs/apiClient';

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

export function fetchCheckinsByFilter(radius, position) {
  return function (dispatch) {
    dispatch(fetchCheckinsStart(radius));

    return apiClient('checkins', { radius: radius, lat: position.lat, lng: position.lng })
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
