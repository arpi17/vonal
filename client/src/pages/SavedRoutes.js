import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSavedRoutes, clearRoutes } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import FeedContainer from '../components/layout/FeedContainer';
import SavedRoutesFeed from '../components/feeds/SavedRoutesFeed';
import withLoading from '../components/HOC/withLoading';

// Declare Feed with Loading HOC
const FeedWithLoading = withLoading(SavedRoutesFeed);

class SavedRoutes extends Component {
  static propTypes = {
    routes: PropTypes.object,
    getSavedRoutes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSavedRoutes();
  }

  componentWillUnmount() {
    this.props.clearRoutes();
  }

  render() {
    const { routes, loading } = this.props.routes;
    return (
      <RoutesMain>
        <SectionTitle>Saved Routes</SectionTitle>
        <FeedContainer>
          <FeedWithLoading isLoading={loading} routes={routes} />
        </FeedContainer>
      </RoutesMain>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = {
  getSavedRoutes,
  clearRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedRoutes);
