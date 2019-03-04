import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapboxToken } from '../accessToken';

import Geolocator from '../components/common/Geolocator';
import Map from '../components/maps/Map';
import SearchBar from '../components/user-input/SearchBar';

mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {}
    };
    this.handleGeolocatorClick = this.handleGeolocatorClick.bind(this);
  }

  componentDidMount() {
    const lng = 5;
    const lat = 34;
    const zoom = 1.5;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    this.setState({ map });
  }

  handleGeolocatorClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { longitude, latitude } = pos.coords;
        this.state.map.flyTo({
          center: [longitude, latitude],
          zoom: 15
        });
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Create Your Own Route</h1>
        <SearchBar map={this.state.map} accessToken={mapboxToken} />
        <Geolocator onClick={this.handleGeolocatorClick} />
        <Map mapContainerRef={el => (this.mapContainer = el)} />
      </div>
    );
  }
}

export default CreateRoute;
