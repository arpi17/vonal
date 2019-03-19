import { GET_ROUTES, SET_FILTER } from '../actions/actionTypes';

const initialState = {
  routes: [],
  filter: {
    country: '',
    city: '',
    type: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTES:
      return {
        ...state,
        routes: action.routes
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}
