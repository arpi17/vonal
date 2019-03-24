import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSavedRoutes } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';

export class SavedRoutes extends Component {
  static propTypes = {
    routes: PropTypes.object,
    getSavedRoutes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSavedRoutes();
  }

  render() {
    return (
      <RoutesMain>
        <SectionTitle>Saved Routes</SectionTitle>
      </RoutesMain>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = {
  getSavedRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedRoutes);
