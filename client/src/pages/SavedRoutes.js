import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSavedRoutes, clearRoutes } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import DiscoverCardWrap from '../components/wraps/DiscoverCardWrap';
import DiscoverFeed from '../components/layout/DiscoverFeed';
import RedirectText from '../components/text/RedirectText';
import LinkText from '../components/text/LinkText';
import Loader from '../components/loaders/Loader';

export class SavedRoutes extends Component {
  static propTypes = {
    routes: PropTypes.object,
    getSavedRoutes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSavedRoutes();
    this.setState({
      isLoading: false
    });
  }

  componentWillUnmount() {
    this.props.clearRoutes();
  }

  render() {
    const { routes, loading } = this.props.routes;
    const routesFeed = loading ? (
      <Loader />
    ) : routes.length > 0 ? (
      routes.map(route => <DiscoverCardWrap route={route} key={route._id} />)
    ) : (
      <RedirectText>
        You have not saved anything. Click{' '}
        <LinkText as={Link} to={'/discover'}>
          here
        </LinkText>{' '}
        to discover routes
      </RedirectText>
    );

    return (
      <RoutesMain>
        <SectionTitle>Saved Routes</SectionTitle>
        <DiscoverFeed>{routesFeed}</DiscoverFeed>
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
