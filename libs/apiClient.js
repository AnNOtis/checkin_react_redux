import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

const API_SERVER_LOCATION = 'http://localhost:3333/api/v1/';

export default function apiClient(endpoint, options = {}) {
  const fullUrl = (endpoint.indexOf(API_SERVER_LOCATION) === -1) ? API_SERVER_LOCATION + endpoint : endpoint;

  return fetch(fullUrl, options)
    .then((response) => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return camelizedJson;
    });
}
