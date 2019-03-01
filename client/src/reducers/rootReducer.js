import { combineReducers } from 'redux';

import errorsReducer from './errorsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer
});

export default rootReducer;
