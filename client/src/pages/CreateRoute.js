import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapboxToken } from '../accessToken';

import Geolocator from '../components/buttons/Geolocator';
import Map from '../components/maps/Map';
import SearchBar from '../components/user-input/SearchBar';
import RouteInitButton from '../components/buttons/RouteInitButton';

mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      isLoading: true,
      route: {},
      isRouteInitialised: false
    };
    this.handleGeolocatorClick = this.handleGeolocatorClick.bind(this);
    this.handleRouteInitClick = this.handleRouteInitClick.bind(this);
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

    this.setState({ map, isLoading: false });
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

  handleRouteInitClick() {
    const { map } = this.state;
    if (map.getZoom() < 11) {
      alert('Please zoom in more to be able to create a local route');
      return;
    }
    if (!this.state.route.isRouteInitialised) {
      this.setState({
        map: map.setMinZoom(11),
        isRouteInitialised: true
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Create Your Own Route</h1>
        <SearchBar
          map={this.state.map}
          isLoading={this.state.isLoading}
          accessToken={mapboxToken}
        />
        <Geolocator onClick={this.handleGeolocatorClick} />
        <Map
          mapRef={el => (this.mapContainer = el)}
          // map={this.state.map}
          isRouteInitialised={this.state.isRouteInitialised}
        />
        {!this.state.isRouteInitialised && (
          <RouteInitButton onClick={this.handleRouteInitClick} />
        )}
      </div>
    );
  }
}

export default CreateRoute;
