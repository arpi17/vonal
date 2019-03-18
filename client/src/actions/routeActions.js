import axios from 'axios';

import { GET_ERRORS } from './actionTypes';

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
