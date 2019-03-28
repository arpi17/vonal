import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {};
const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);

export default store;
