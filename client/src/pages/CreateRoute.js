import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import Geolocator from '../components/buttons/Geolocator';
import Map from '../components/maps/Map';
import SearchBar from '../components/user-input/SearchBar';
import RouteInitButton from '../components/buttons/RouteInitButton';

import { setDraw, updateRoute, removeRoute } from '../utils/setRoute';

import { mapboxToken } from '../accessToken';
import MapData from '../components/user-input/MapData';
mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      isLoading: true,
      route: {},
      isRouteInitialised: false,
      title: '',
      description: '',
      tags: []
    };
    this.handleGeolocatorClick = this.handleGeolocatorClick.bind(this);
    this.handleRouteInitClick = this.handleRouteInitClick.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this)
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
    const { map, isRouteInitialised } = this.state;
    if (map.getZoom() < 11) {
      alert('Please zoom in more to be able to create a local route');
      return;
    }
    if (!isRouteInitialised) {
      // Add draw event handlers
      const draw = setDraw();
      map.on('draw.create', () => updateRoute(draw, map, mapboxToken));
      map.on('draw.update', () => updateRoute(draw, map, mapboxToken));
      map.on('draw.delete', () => removeRoute(map));

      this.setState({
        map: map.setMinZoom(11).addControl(draw),
        isRouteInitialised: true
      });
    }
  }

  handleDataChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
        <div style={mapAndDescStyle}>
          <Map
            mapRef={el => (this.mapContainer = el)}
            // map={this.state.map}
            isRouteInitialised={this.state.isRouteInitialised}
          />
          {!this.state.isRouteInitialised ? (
            <RouteInitButton
              onClick={this.handleRouteInitClick}
              style={buttonStyle}
            />
          ) : (
            < MapData 
              title={this.state.title}
              description={this.state.description}
              onChange={this.handleDataChange}
            />
          )
          }
        </div>
      </div>
    );
  }
}

// FOR DEVELOPEMENT ONLY
const mapAndDescStyle = {
  width: '80%',
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-around'
};

const buttonStyle = {
  width: '100px',
  height: '30px'
};

export default CreateRoute;
