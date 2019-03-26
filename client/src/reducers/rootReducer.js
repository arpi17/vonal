import { combineReducers } from 'redux';

import errorsReducer from './errorsReducer';
import authReducer from './authReducer';
import routesReducer from './routesReducer';
import savedReducer from './savedReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  routes: routesReducer,
  saved: savedReducer,
  errors: errorsReducer
});

export default rootReducer;
