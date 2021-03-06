import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';

import setAuthToken from '../utils/setAuthToken';
import { getSavedRoutes } from './savedActions';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        errors: err.response.data
      });
    });
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post('/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      dispatch(getSavedRoutes());
      dispatch(setCurrentUser(jwt_decode(token)));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        errors: err.response.data
      });
    });
};

// Set current user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

// Logout current user
export const logoutUser = () => dispatch => {
  localStorage.removeItem('authToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
