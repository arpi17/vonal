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
      zoom: 1.5
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

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken
    });

    this.geocoderRef.current.appendChild(geocoder.onAdd(map));
  }

  componentWillUnmount() {
    this.map.remove();
  }

  handleCoordChange() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { longitude, latitude } = pos.coords;
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
