import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMyRoutes, clearRoutes, deleteRoute } from '../actions/routeActions';

import SectionTitle from '../components/text/SectionTitle';
import RoutesMain from '../components/main/RoutesMain';
import RouteCardContainer from '../components/layout/RouteCardContainer';
import RouteCard from '../components/cards/RouteCard';
import RouteTitle from '../components/text/RouteTitle';
import RouteLocation from '../components/text/RouteLocation';
import Thumbnail from '../components/map/Thumbnail';
import ThumbnailOverlay from '../components/layout/ThumbnailOverlay';
import Button from '../components/buttons/Button';

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
      <RouteCard key={route._id}>
        <Thumbnail src={route.thumbnail.URL} />
        <ThumbnailOverlay>
          <Button onClick={() => this.handleDeleteClick(route._id)}>
            Delete
          </Button>
          <Button>Edit</Button>
        </ThumbnailOverlay>
        <RouteTitle>{route.title}</RouteTitle>
        <RouteLocation>
          {route.city}, {route.country}
        </RouteLocation>
      </RouteCard>
    ));
    return (
      <RoutesMain>
        <SectionTitle>My Routes</SectionTitle>
        <RouteCardContainer>{routesFeed}</RouteCardContainer>
      </RoutesMain>
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
