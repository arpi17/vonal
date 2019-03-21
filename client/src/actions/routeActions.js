import axios from 'axios';

import { GET_ERRORS, GET_ROUTES, SET_FILTER } from './actionTypes';

// Create a route
export const createRoute = (route, history) => dispatch => {
  axios
    .post('routes', route)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        errors: err.response.data
      });
    });
};

// FIXME: request is sent even when the filter did not change

// Get the routes based on the filter
export const getRoutes = filter => dispatch => {
  let url = 'routes?';

  // Set up URL query
  if (Object.values(filter).some(query => query)) {
    const queries = Object.keys(filter);
    for (let query of queries) {
      if (filter[query]) {
        url += `${query}=${filter[query]}&`;
      }
    }
  }
  // Remove the last '&' or '?'
  url = url.slice(0, url.length - 1);

  axios
    .get(url)
    .then(res => {
      dispatch({
        type: GET_ROUTES,
        routes: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getMyRoutes = userID => dispatch => {
  axios
    .get(`users/myroutes/${userID}`)
    .then(res => {
      dispatch({
        type: GET_ROUTES,
        routes: res.data
      });
    })
    .catch(err => console.log(err));
};

// Set filter
export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter
  };
};
