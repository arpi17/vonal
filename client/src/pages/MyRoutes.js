import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMyRoutes, clearRoutes, deleteRoute } from '../actions/routeActions';

import SectionTitle from '../components/text/SectionTitle';
import RoutesMain from '../components/main/RoutesMain';
import RouteCardContainer from '../components/layout/RouteCardContainer';
import MyRoutesFeed from '../components/feeds/MyRoutesFeed';
import withLoading from '../components/HOC/withLoading';

// Declare Feed with Loading HOC
const FeedWithLoading = withLoading(MyRoutesFeed);

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

    return (
      <RoutesMain>
        <SectionTitle>My Routes</SectionTitle>
        <RouteCardContainer>
          <FeedWithLoading
            isLoading={loading}
            routes={routes}
            onDeleteClick={this.handleDeleteClick}
          />
        </RouteCardContainer>
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
