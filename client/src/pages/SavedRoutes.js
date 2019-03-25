import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSavedRoutes, clearRoutes } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import DiscoverCardWrap from '../components/wraps/DiscoverCardWrap';
import DiscoverFeed from '../components/layout/DiscoverFeed';

export class SavedRoutes extends Component {
  static propTypes = {
    routes: PropTypes.object,
    getSavedRoutes: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

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
    const { isLoading } = this.state;
    const { routes } = this.props.routes;
    const routesFeed = isLoading ? (
      <h4>Loading...</h4>
    ) : (
      routes.map(route => <DiscoverCardWrap route={route} key={route._id} />)
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
