export const FETCH_CHECKINS = 'FETCH_CHECKINS';
export const FETCH_CHECKINS_SUCCESS = 'FETCH_CHECKINS_SUCCESS';
export const FETCH_CHECKINS_FAILURE = 'FETCH_CHECKINS_FAILURE';
export const LOAD_CHECKINS = 'LOAD_CHECKINS';

export const SET_DISTANCE_FILTER = 'SET_DISTANCE_FILTER';


export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
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
          navigator.geolocation.getCurrentPosition(
            position => { dispatch(requestCurrentLocationSuccess(position)) },
            error => { dispatch(requestCurrentLocationFailed(error)) }
          );
        }
      )
    }
  };
}
