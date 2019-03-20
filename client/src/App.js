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
import Discover from './pages/Discover';
import About from './pages/About';
import Contact from './pages/Contact';

// Components
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';

// Redux
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Utils
import setAuthToken from './utils/setAuthToken';

// Styles
import './App.css';

const token = localStorage['authToken'];
if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

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
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create" component={CreateRoute} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/my-routes" component={MyRoutes} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
