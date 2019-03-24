import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentRoute, clearRoute } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';

export class CurrentRoute extends Component {
  static propTypes = {
    auth: PropTypes.object,
    routes: PropTypes.object.isRequired,
    getCurrentRoute: PropTypes.func.isRequired,
    clearRoute: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { routes } = this.props.routes;

    this.props.getCurrentRoute(id, routes);
    this.setState({
      isLoading: false
    });
  }

  componentWillUnmount() {
    this.props.clearRoute();
  }

  render() {
    const routeInfo = this.state.isLoading ? (
      <span>LOADING...</span>
    ) : (
      <span>{this.props.routes.route.title}</span>
    );
    return (
      <RoutesMain>
        <h1>Welcome to route</h1>
        {routeInfo}
      </RoutesMain>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  routes: state.routes
});

const mapDispatchToProps = {
  getCurrentRoute,
  clearRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentRoute);
