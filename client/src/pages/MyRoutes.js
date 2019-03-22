import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMyRoutes, clearRoutes, deleteRoute } from '../actions/routeActions';

export class MyRoutes extends Component {
  static propTypes = {
    getMyRoutes: PropTypes.func.isRequired,
    deleteRoute: PropTypes.func.isRequired,
    clearRoutes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    routes: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getMyRoutes(id);
  }

  componentWillUnmount() {
    this.props.clearRoutes();
  }

  handleDeleteClick(id) {
    this.props.deleteRoute(id);
  }

  render() {
    const routesFeed = this.props.routes.routes.map(route => (
      <div key={route._id}>
        <img src={route.thumbnail.URL} alt="" width="200px" height="200px" />
        <p>Created at {route.date}</p>
        <button onClick={() => this.handleDeleteClick(route._id)}>
          DELETE
        </button>
      </div>
    ));
    return (
      <div>
        <h1>My Routes</h1>
        {routesFeed}
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
  deleteRoute,
  clearRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRoutes);
