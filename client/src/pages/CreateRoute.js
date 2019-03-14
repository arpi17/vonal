import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

// import Map from '../components/maps/Map';
import SearchBar from '../components/user-input/SearchBar';

// Styled-components
import {
  CreateRouteMain,
  MapContainer,
  Map,
  DescContainer
} from '../styles/CreatePage';

// utils
import setDraw from '../utils/setDraw';
import setRouteLayer from '../utils/setRouteLayer';
import parseLocation from '../utils/parseLocation';
import getBoundingCoords from '../utils/getBoundingCoords';

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
        country: '',
        city: '',
        title: '',
        description: '',
        tags: [],
        coords: [],
        type: 'walking',
        geometry: '',
        mapURL: ''
      },
      currentTag: ''
    };

    this.handleRouteInitClick = this.handleRouteInitClick.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleAddTagClick = this.handleAddTagClick.bind(this);
    this.handleDeleteTagClick = this.handleDeleteTagClick.bind(this);
    this.handleDrawRouteClick = this.handleDrawRouteClick.bind(this);
    this.setLocationName = this.setLocationName.bind(this);
    this.handleCreateRouteClick = this.handleCreateRouteClick.bind(this);
  }

  componentDidMount() {
    const lng = 5;
    const lat = 34;
    const zoom = 1.5;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
      preserveDrawingBuffer: true
    });

    const geolocator = new mapboxgl.GeolocateControl({
      fitBoundsOptions: {
        maxZoom: 13
      },
      showUserLocation: false
    });

    map.addControl(geolocator);

    this.setState({ map, isLoading: false });
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
        const geometry = data.routes[0].geometry;

        if (map.getSource('route')) {
          map.removeLayer('route');
          map.removeSource('route');
        } else {
          map.addLayer(setRouteLayer(geometry));
        }

        this.setState({
          route: {
            ...this.state.route,
            geometry
          }
        });
      });
  }

  setCoords(e) {
    this.removeRoute();
    const lastFeature = e.features.length - 1;
    const coords = e.features[lastFeature].geometry.coordinates;
    this.setState({
      route: {
        ...this.state.route,
        coords
      }
    });
    this.setLocationName();
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

  setLocationName() {
    const { coords } = this.state.route;
    if (coords.length > 0) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        coords[0]
      }.json?access_token=${mapboxToken}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const [country, city] = parseLocation(data.features);
          this.setState({
            route: {
              ...this.state.route,
              country,
              city
            }
          });
        });
    }
  }

  handleCreateRouteClick() {
    const {
      map,
      route: { coords }
    } = this.state;

    const bound = getBoundingCoords(coords);
    const boundOpts = {
      padding: {
        top: 50,
        bottom: 50,
        left: 25,
        right: 25
      }
    };

    map.setMinZoom().fitBounds(bound, boundOpts);
    map.on('zoomend', () => {
      const mapURL = map.getCanvas().toDataURL('image/png');
      this.setState({
        route: {
          ...this.state.route,
          mapURL
        }
      });
    });
  }

  render() {
    const {
      map,
      isLoading,
      route: { title, description, tags, type },
      currentTag
    } = this.state;

    return (
      <CreateRouteMain>
        <MapContainer>
          <SearchBar
            map={map}
            isLoading={isLoading}
            accessToken={mapboxToken}
          />

          <Map ref={el => (this.mapContainer = el)} />
          <button onClick={this.handleRouteInitClick}>Start Drawing</button>
        </MapContainer>
        <DescContainer>
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
            createRouteClick={this.handleCreateRouteClick}
          />
        </DescContainer>
      </CreateRouteMain>
    );
  }
}

export default CreateRoute;
