import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateRoute from './pages/CreateRoute';

// Components
import PrivateRoute from './components/PrivateRoute';

// Redux
import store from './store';
import { setCurrentUser } from './actions/authActions';

// Utils
import setAuthToken from './utils/setAuthToken';

// Styles
import './App.css';

class App extends Component {
  componentDidMount() {
    const token = localStorage['authToken'];
    if (token) {
      setAuthToken(token);
      store.dispatch(setCurrentUser(token));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create" component={CreateRoute} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
