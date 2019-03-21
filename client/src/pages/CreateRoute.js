import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { mapboxToken } from '../accessToken';
import isEqual from 'lodash.isequal';

// Components
import MapData from '../components/user-input/MapData';
import SearchBar from '../components/user-input/SearchBar';

// Styled-components
import {
  CreateRouteMain,
  MapContainer,
  Map,
  DescContainer
} from '../styles/CreatePage';

// Actions
import { createRoute } from '../actions/routeActions';

// utils
import setDraw from '../utils/setDraw';
import setRouteLayer from '../utils/setRouteLayer';
import parseLocation from '../utils/parseLocation';
import setOverlay from '../utils/setOverlay';

// Set Mapbox Access Token
mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      isLoading: true,
      route: {
        country: '',
        city: '',
        title: '',
        description: '',
        tags: [],
        coords: [],
        type: 'walking',
        geometry: {},
        thumbnail: {
          URL: ''
        }
      },
      currentTag: '',
      errors: {}
    };

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleAddTagClick = this.handleAddTagClick.bind(this);
    this.handleDeleteTagClick = this.handleDeleteTagClick.bind(this);
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
      zoom
    });

    const geolocator = new mapboxgl.GeolocateControl({
      fitBoundsOptions: {
        maxZoom: 14
      },
      showUserLocation: false
    });

    map.addControl(geolocator);

    const zoomListener = () => {
      if (map.getZoom() >= 10) {
        const draw = setDraw();
        map.on('draw.create', e => this.drawRoute(e));
        map.on('draw.update', e => this.drawRoute(e));
        map.on('draw.delete', () => this.removeRoute());
        map.setMinZoom(10).addControl(draw);

        // Remove event listener
        map.off('zoomend', zoomListener);
      }
    };
    map.on('zoomend', zoomListener);

    this.setState({ map, isLoading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }

    const prevCoords = prevState.route.coords[0];
    const newCoords = this.state.route.coords[0] || null;
    if (newCoords && !isEqual(prevCoords, newCoords)) {
      this.setLocationName(newCoords);
    }
  }

  componentWillUnmount() {
    // IDEA: Save map to localeStorage
    this.state.map.remove();
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

  handleCreateRouteClick() {
    const {
      route: { coords, geometry }
    } = this.state;
    const overlay = setOverlay(geometry, coords);
    const url = `
        https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(${overlay})/auto/400x400?access_token=${mapboxToken}`;

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          this.setState({
            route: {
              ...this.state.route,
              thumbnail: {
                URL: base64data
              }
            }
          });
          // Convert the tags array
          const { route } = this.state;
          // const newTags = route.tags.map(tag => tag.name);
          // console.log(newTags);
          // route.tags = newTags;
          // Send POST request
          this.props.createRoute(route, this.props.history);
        };
      });
  }

  drawRoute(e) {
    const {
      map,
      route: { type }
    } = this.state;

    const lastFeature = e.features.length - 1;
    const coords = e.features[lastFeature].geometry.coordinates;

    if (coords.length >= 2) {
      const newCoords = coords.join(';');
      const url = `
        https://api.mapbox.com/directions/v5/mapbox/${type}/${newCoords}?geometries=geojson&access_token=${mapboxToken}
      `;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const geometry = data.routes[0].geometry;
          const newLayer = setRouteLayer(geometry);

          this.removeRoute();
          map.addLayer(newLayer);

          this.setState({
            route: {
              ...this.state.route,
              coords,
              geometry
            }
          });
        });
    }
  }

  removeRoute() {
    const { map } = this.state;
    if (map.getSource('route')) {
      map.removeLayer('route');
      map.removeSource('route');
      this.setState({
        route: {
          ...this.state.route,
          country: '',
          city: '',
          coords: [],
          geometry: {}
        }
      });
    } else {
      return;
    }
  }

  setLocationName(coords) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${mapboxToken}`;
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

  render() {
    const {
      map,
      isLoading,
      route: { title, description, tags, type },
      currentTag,
      errors
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
        </MapContainer>
        <DescContainer>
          <MapData
            title={title}
            description={description}
            currentTag={currentTag}
            tags={tags}
            type={type}
            errors={errors}
            onChange={this.handleDataChange}
            addTagClick={this.handleAddTagClick}
            deleteTagClick={this.handleDeleteTagClick}
            createRouteClick={this.handleCreateRouteClick}
          />
        </DescContainer>
      </CreateRouteMain>
    );
  }
}

CreateRoute.propTypes = {
  createRoute: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateRoute));
