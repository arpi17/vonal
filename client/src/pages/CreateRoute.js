import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import Geolocator from '../components/buttons/Geolocator';
import Map from '../components/maps/Map';
import SearchBar from '../components/user-input/SearchBar';
import RouteInitButton from '../components/buttons/RouteInitButton';

import { setDraw, setRouteLayer } from '../utils/setRoute';

import { mapboxToken } from '../accessToken';
import MapData from '../components/user-input/MapData';
mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      isLoading: true,
      isRouteInitialised: false,
      route: {
        city: '', // TODO: Set it on submit
        coutry: '', // TODO: Set it on submit
        title: '',
        description: '',
        tags: [],
        coords: [],
        type: 'walking'
      },
      currentTag: ''
    };
    this.handleGeolocatorClick = this.handleGeolocatorClick.bind(this);
    this.handleRouteInitClick = this.handleRouteInitClick.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleAddTagClick = this.handleAddTagClick.bind(this);
    this.handleDeleteTagClick = this.handleDeleteTagClick.bind(this);
    this.handleDrawRouteClick = this.handleDrawRouteClick.bind(this);
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
      const draw = setDraw();
      map.on('draw.create', e => this.setCoords(e));
      map.on('draw.update', e => this.setCoords(e));
      map.on('draw.delete', () => this.removeRoute(map));

      this.setState({
        map: map.setMinZoom(11).addControl(draw),
        isRouteInitialised: true
      });
    }
  }

  handleDataChange(e) {
    if (e.target.name !== 'currentTag') {
      this.setState({
        route: {
          ...this.state.route,
          [e.target.name]: e.target.value
        }
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleAddTagClick() {
    const name = this.state.currentTag.trim().toLowerCase();
    if (this.state.route.tags.every(tag => tag.name !== name) && name !== '') {
      this.setState(state => ({
        route: {
          ...state.route,
          tags: [
            ...state.route.tags,
            {
              id: name,
              name
            }
          ]
        },
        currentTag: ''
      }));
    }
  }

  handleDeleteTagClick(id) {
    this.setState({
      route: {
        ...this.state.route,
        tags: this.state.route.tags.filter(tag => tag.id !== id)
      }
    });
  }

  handleDrawRouteClick() {
    const {
      map,
      route: { type }
    } = this.state;
    const coords = this.state.route.coords.join(';');

    const url = `
      https://api.mapbox.com/directions/v5/mapbox/${type}/${coords}?geometries=geojson&access_token=${mapboxToken}
    `;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const coords = data.routes[0].geometry;

        if (map.getSource('route')) {
          map.removeLayer('route');
          map.removeSource('route');
        } else {
          map.addLayer(setRouteLayer(coords));
        }
      });
  }

  setCoords(e) {
    // Which features to add???
    this.removeRoute();
    const coords = e.features[0].geometry.coordinates;
    this.setState({
      route: {
        ...this.state.route,
        coords
      }
    });
  }

  removeRoute() {
    const { map } = this.state;
    if (map.getSource('route')) {
      map.removeLayer('route');
      map.removeSource('route');
    } else {
      return;
    }
  }

  render() {
    const {
      map,
      isLoading,
      isRouteInitialised,
      route: { title, description, tags, type },
      currentTag
    } = this.state;

    return (
      <div>
        <h1>Create Your Own Route</h1>
        <SearchBar map={map} isLoading={isLoading} accessToken={mapboxToken} />
        <Geolocator onClick={this.handleGeolocatorClick} />
        <div style={mapAndDescStyle}>
          <Map
            mapRef={el => (this.mapContainer = el)}
            isRouteInitialised={isRouteInitialised}
          />
          {!isRouteInitialised ? (
            <RouteInitButton
              onClick={this.handleRouteInitClick}
              style={buttonStyle}
            />
          ) : (
            <MapData
              title={title}
              description={description}
              currentTag={currentTag}
              tags={tags}
              type={type}
              onChange={this.handleDataChange}
              addTagClick={this.handleAddTagClick}
              deleteTagClick={this.handleDeleteTagClick}
              drawRouteClick={this.handleDrawRouteClick}
            />
          )}
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
