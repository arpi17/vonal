import {
  GET_ROUTES,
  GET_CURRENT_ROUTE,
  DELETE_ROUTE,
  CLEAR_ROUTE,
  CLEAR_ROUTES,
  SET_FILTER,
  IS_LOADING
} from '../actions/actionTypes';

const initialState = {
  route: {},
  routes: [],
  filter: {
    country: '',
    city: '',
    type: ''
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTES:
      return {
        ...state,
        routes: action.routes,
        loading: false
      };
    case GET_CURRENT_ROUTE:
      return {
        ...state,
        route: action.route,
        loading: false
      };
    case DELETE_ROUTE:
      return {
        ...state,
        routes: action.routes
      };
    case CLEAR_ROUTE:
      return {
        ...state,
        route: {}
      };
    case CLEAR_ROUTES:
      return {
        ...state,
        routes: []
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
