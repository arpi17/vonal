import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateRoute from './pages/CreateRoute';
import MyRoutes from './pages/MyRoutes';
import SavedRoutes from './pages/SavedRoutes';
import CurrentRoute from './pages/CurrentRoute';
import Discover from './pages/Discover';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Components
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';

// Redux
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { getSavedRoutes } from './actions/savedActions';

// Utils
import setAuthToken from './utils/setAuthToken';

// Styles
import './App.css';

// TODO: REMOVE THIS
console.log(process.env);
console.log('mapbox token: ' + process.env.MAPBOX_TOKEN);
console.log('mongo: ' + process.env.MONGO_URI);
console.log('secret: ' + process.env.SECRET_OR_KEY);

const token = localStorage['authToken'];
if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  // Get saved routes
  store.dispatch(getSavedRoutes());

  // Check for expiration
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  store.getState().auth.isAuthenticated ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Landing />
                  )
                }
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/discover" component={Discover} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/routes/:id" component={CurrentRoute} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create" component={CreateRoute} />
              <PrivateRoute exact path="/my-routes" component={MyRoutes} />
              <PrivateRoute
                exact
                path="/saved-routes"
                component={SavedRoutes}
              />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
