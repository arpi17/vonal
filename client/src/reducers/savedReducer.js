import {
  GET_SAVED_ROUTES,
  SAVE_ROUTE,
  UNSAVE_ROUTE
} from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_ROUTES:
      return action.saved;
    case SAVE_ROUTE:
      return state.indexOf(action.id) === -1 ? [...state, action.id] : state;
    case UNSAVE_ROUTE:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
}
