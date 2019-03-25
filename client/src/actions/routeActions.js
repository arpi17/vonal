import axios from 'axios';

import {
  GET_ERRORS,
  GET_ROUTES,
  GET_CURRENT_ROUTE,
  DELETE_ROUTE,
  SET_FILTER,
  CLEAR_ROUTE,
  CLEAR_ROUTES
} from './actionTypes';

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

// Update route
export const updateRoute = (id, route, history) => dispatch => {
  axios
    .put(`routes/${id}`, route)
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

// Get single route
export const getCurrentRoute = (id, cachedRoutes = []) => dispatch => {
  if (cachedRoutes.length > 0) {
    const [route] = cachedRoutes.filter(r => r._id.toString() === id);
    return dispatch({
      type: GET_CURRENT_ROUTE,
      route
    });
  } else {
    axios
      .get(`/routes/${id}`)
      .then(res => {
        dispatch({
          type: GET_CURRENT_ROUTE,
          route: res.data
        });
      })
      .catch(err => console.log(err));
  }
};

// Get own routes
export const getMyRoutes = () => dispatch => {
  axios
    .get('users/myroutes')
    .then(res => {
      dispatch({
        type: GET_ROUTES,
        routes: res.data
      });
    })
    .catch(err => console.log(err));
};

// Get saved routes
export const getSavedRoutes = () => dispatch => {
  axios
    .get('users/saved')
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_ROUTES,
        routes: res.data
      });
    })
    .catch(err => console.log(err));
};

// Delete an own route
export const deleteRoute = id => dispatch => {
  axios
    .delete(`routes/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ROUTE,
        routes: res.data.routes
      });
    })
    .catch(err => console.log(err));
};

// Clear a single route
export const clearRoute = () => {
  return {
    type: CLEAR_ROUTE
  };
};

// Clear all routes
export const clearRoutes = () => {
  return {
    type: CLEAR_ROUTES
  };
};

// Set filter
export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter
  };
};
