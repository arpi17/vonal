import axios from 'axios';

import { GET_SAVED_ROUTES, SAVE_ROUTE, UNSAVE_ROUTE } from './actionTypes';

export const getSavedRoutes = () => dispatch => {
  axios
    .get('/users/saved?list=true')
    .then(res => {
      dispatch({
        type: GET_SAVED_ROUTES,
        saved: res.data
      });
    })
    .catch(err => console.log(err));
};

export const saveRoute = id => dispatch => {
  axios
    .put(`users/saved/${id}`)
    .then(res => {
      dispatch({
        type: SAVE_ROUTE,
        id
      });
    })
    .catch(err => console.log(err));
};

export const unsaveRoute = id => dispatch => {
  axios
    .delete(`users/saved/${id}`)
    .then(res => {
      dispatch({
        type: UNSAVE_ROUTE,
        id
      });
    })
    .catch(err => console.log(err));
};
