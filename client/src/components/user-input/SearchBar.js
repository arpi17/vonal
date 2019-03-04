import React, { Component } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import isEmpty from 'lodash.isempty';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.geocoderRef = React.createRef();
  }
  render() {
    const { map, accessToken } = this.props;
    if (!isEmpty(map)) {
      const geocoder = new MapboxGeocoder({
        accessToken
      });
      this.geocoderRef.current.appendChild(geocoder.onAdd(map));
    }
    return <div className="search-bar" ref={this.geocoderRef} />;
  }
}

export default SearchBar;
