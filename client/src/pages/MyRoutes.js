import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMyRoutes, clearRoutes } from '../actions/routeActions';

export class MyRoutes extends Component {
  static propTypes = {
    getMyRoutes: PropTypes.func.isRequired,
    clearRoutes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    routes: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getMyRoutes(id);
  }

  componentWillUnmount() {
    this.props.clearRoutes();
  }

  render() {
    return (
      <div>
        <h1>My Routes</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  routes: state.routes
});

const mapDispatchToProps = {
  getMyRoutes,
  clearRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRoutes);
