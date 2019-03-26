import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMyRoutes, clearRoutes, deleteRoute } from '../actions/routeActions';

import SectionTitle from '../components/text/SectionTitle';
import RoutesMain from '../components/main/RoutesMain';
import RouteCardContainer from '../components/layout/RouteCardContainer';
import RouteCardWrap from '../components/wraps/RouteCardWrap';
import RedirectText from '../components/text/RedirectText';
import LinkText from '../components/text/LinkText';
import Loader from '../components/loaders/Loader';

export class MyRoutes extends Component {
  static propTypes = {
    getMyRoutes: PropTypes.func.isRequired,
    deleteRoute: PropTypes.func.isRequired,
    clearRoutes: PropTypes.func.isRequired,
    routes: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getMyRoutes();
  }

  componentWillUnmount() {
    this.props.clearRoutes();
  }

  handleDeleteClick(id) {
    this.props.deleteRoute(id);
  }

  render() {
    const { routes, loading } = this.props.routes;
    const routesFeed = loading ? (
      <Loader />
    ) : routes.length > 0 ? (
      routes.map(route => (
        <RouteCardWrap
          key={route._id}
          route={route}
          onDeleteClick={this.handleDeleteClick}
        />
      ))
    ) : (
      <RedirectText>
        You have not created a route yet. Click{' '}
        <LinkText as={Link} to={'/create'}>
          here
        </LinkText>{' '}
        to create one
      </RedirectText>
    );

    return (
      <RoutesMain>
        <SectionTitle>My Routes</SectionTitle>
        <RouteCardContainer>{routesFeed}</RouteCardContainer>
      </RoutesMain>
    );
  }
}

const mapStateToProps = state => ({
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
