import { SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from 'lodash.isempty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
}
