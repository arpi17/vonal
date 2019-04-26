import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import isEmpty from 'lodash.isempty';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.geocoderRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      const { map, accessToken } = this.props;
      if (!isEmpty(map)) {
        const geocoder = new MapboxGeocoder({
          accessToken,
          placeholder: 'Search Location'
        });
        this.geocoderRef.current.appendChild(geocoder.onAdd(map));
      }
    }
  }

  render() {
    return (
      <div
        className="search-bar"
        style={{ zIndex: '10' }}
        ref={this.geocoderRef}
      />
    );
  }
}

SearchBar.propTypes = {
  map: PropTypes.object.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default SearchBar;
