import merge from 'lodash/object/merge';
import {
  REQUEST_CURRENT_LOCATION,
  REQUEST_CURRENT_LOCATION_SUCCESS,
  REQUEST_CURRENT_LOCATION_FAILURE
} from '../actions';

const TAIPEI_STATION_LOCATION = { lat: 25.048176, lng: 121.517069 };

export default function geolocation(state = {
  isRequesting: false,
  current: TAIPEI_STATION_LOCATION
}, action) {
  switch (action.type) {
  case REQUEST_CURRENT_LOCATION:
    return merge({}, state, { isRequesting: true });
  case REQUEST_CURRENT_LOCATION_FAILURE:
    return merge({}, state, { isRequesting: false });
  case REQUEST_CURRENT_LOCATION_SUCCESS:
    let lat = action.response.coords.latitude;
    let lng = action.response.coords.longitude;
    return merge({}, state, { isRequesting: false, current: {lat, lng} });
  default:
    return state;
  }
}
