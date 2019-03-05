import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  render() {
    return (
      <div
        className="map"
        ref={this.props.mapRef}
        style={{ width: '400px', height: '400px' }}
      />
    );
  }
}

Map.propTypes = {
  mapRef: PropTypes.func.isRequired,
  isRouteInitialised: PropTypes.bool.isRequired
};

export default Map;
