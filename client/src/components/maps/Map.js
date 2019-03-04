import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';

class Map extends Component {
  render() {
    return (
      <div
        className="map"
        ref={this.props.mapRef}
        style={{ width: '500px', height: '500px' }}
      />
    );
  }
}

Map.propTypes = {
  mapRef: PropTypes.func.isRequired,
  isRouteInitialised: PropTypes.bool.isRequired
};

export default Map;
