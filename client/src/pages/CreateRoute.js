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
import CreateRouteMain from '../components/main/CreateRouteMain';
import MapContainer from '../components/layout/MapContainer';
import DescContainer from '../components/layout/DescContainer';
import Map from '../components/map/Map';

// Actions
import { createRoute, updateRoute } from '../actions/routeActions';

// utils
import setDraw from '../utils/setDraw';
import setRouteLayer from '../utils/setRouteLayer';
import parseLocation from '../utils/parseLocation';
import setOverlay from '../utils/setOverlay';
import getBoundingCoords from '../utils/getBoundingCoords';

// Set Mapbox Access Token
mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      isLoading: true,
      _id: '',
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
    this.handleSendRouteClick = this.handleSendRouteClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setLocationName = this.setLocationName.bind(this);
    this.setRoute = this.setRoute.bind(this);
  }

  componentDidMount() {
    const lng = 5;
    const lat = 34;
    const zoom = 1.5;

    const { route } = this.props.location.state || {};

    if (route) {
      this.setState({
        route: {
          country: route.country,
          city: route.city,
          title: route.title,
          description: route.description || '',
          tags: route.tags || [],
          coords: route.coords,
          type: route.type,
          geometry: route.geometry,
          thubnail: route.thubnail
        },
        _id: route._id
      });
    }

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
      bounds: route && getBoundingCoords(route.geometry.coordinates),
      fitBoundsOptions: {
        padding: 30
      }
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

    const loadListener = () => {
      map.addLayer(setRouteLayer(this.props.location.state.route.geometry));
      const draw = setDraw();
      map.on('draw.create', e => this.drawRoute(e));
      map.on('draw.update', e => this.drawRoute(e));
      map.on('draw.delete', () => this.removeRoute());
      map.setMinZoom(10).addControl(draw);

      // Add points
      const feature = {
        geometry: {
          coordinates: route.coords,
          type: 'LineString'
        },
        type: 'Feature',
        properties: {}
      };
      draw.add(feature);

      // Remove event listener
      map.off('load', loadListener);
    };

    if (route) {
      map.on('load', loadListener);
    } else {
      map.on('zoomend', zoomListener);
    }

    this.setState({ map, isLoading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }

    // Check if location name needs to be changed
    const prevCoords = prevState.route.coords[0];
    const coords = this.state.route.coords[0] || null;
    if (coords && !isEqual(prevCoords, coords)) {
      this.setLocationName(coords);
    }

    // Check if route needs to be updated due to type change
    if (coords && prevState.route.type !== this.state.route.type) {
      this.setRoute(this.state.route.type, this.state.route.coords);
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
    const newTag = this.state.currentTag.trim().toLowerCase();
    if (this.state.route.tags.every(tag => tag !== newTag) && newTag !== '') {
      this.setState(state => ({
        route: {
          ...state.route,
          tags: [...state.route.tags, newTag]
        },
        currentTag: ''
      }));
    }
  }

  handleDeleteTagClick(tagName) {
    this.setState({
      route: {
        ...this.state.route,
        tags: this.state.route.tags.filter(tag => tag !== tagName)
      }
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleAddTagClick();
    }
  }

  handleSendRouteClick() {
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
          if (this.state._id) {
            this.props.updateRoute(
              this.state._id,
              this.state.route,
              this.props.history
            );
          } else {
            this.props.createRoute(this.state.route, this.props.history);
          }
        };
      });
  }

  drawRoute(e) {
    const { type } = this.state.route;

    const lastFeature = e.features.length - 1;
    const coords = e.features[lastFeature].geometry.coordinates;

    this.setRoute(type, coords);
  }

  setRoute(type, coords) {
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
          this.state.map.addLayer(newLayer);

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
      _id,
      route: { title, description, tags, type, coords },
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
            coords={coords}
            errors={errors}
            onChange={this.handleDataChange}
            addTagClick={this.handleAddTagClick}
            deleteTagClick={this.handleDeleteTagClick}
            onKeyDown={this.handleKeyDown}
            sendRouteClick={this.handleSendRouteClick}
            _id={_id}
          />
        </DescContainer>
      </CreateRouteMain>
    );
  }
}

CreateRoute.propTypes = {
  createRoute: PropTypes.func.isRequired,
  updateRoute: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createRoute,
  updateRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateRoute));
