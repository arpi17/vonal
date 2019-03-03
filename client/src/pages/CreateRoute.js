import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { mapboxToken } from '../accessToken';
import Geolocation from '../components/common/Geolocation';
// import SearchBar from '../components/user-input/SearchBar';

mapboxgl.accessToken = mapboxToken;

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.geocoderRef = React.createRef();
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      map: {}
    };
    this.handleCoordChange = this.handleCoordChange.bind(this);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    // Register move event handler
    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    this.setState({ map });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken
    });

    this.geocoderRef.current.appendChild(geocoder.onAdd(map));
  }

  handleCoordChange() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { longitude, latitude } = pos.coords;
        this.state.map.flyTo({
          center: [longitude, latitude],
          zoom: 15
        });
        this.setState({
          lng: longitude.toFixed(4),
          lat: latitude.toFixed(4),
          zoom: 15
        });
      });
    }
  }

  render() {
    const { lng, lat, zoom } = this.state;
    console.log(this.geocoderRef);
    return (
      <div>
        <div>
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        {/* <SearchBar geocoderRef={el => (this.geocoder = el)} /> */}
        <div className="search-bar" ref={this.geocoderRef} />
        <Geolocation onClick={this.handleCoordChange} />
        <div
          ref={el => (this.mapContainer = el)}
          style={{ width: '500px', height: '500px' }}
        />
      </div>
    );
  }
}

export default CreateRoute;
