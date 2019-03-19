import { combineReducers } from 'redux';

import errorsReducer from './errorsReducer';
import authReducer from './authReducer';
import routesReducer from './routesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  routes: routesReducer,
  errors: errorsReducer
});

export default rootReducer;
