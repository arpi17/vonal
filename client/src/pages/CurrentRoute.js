import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
// import { mapboxToken } from '../accessToken';
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';

// Actions
import { getCurrentRoute, clearRoute } from '../actions/routeActions';
import { saveRoute, unsaveRoute } from '../actions/savedActions';

// utils
import setRouteLayer from '../utils/setRouteLayer';
import getBoundingCoords from '../utils/getBoundingCoords';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import SectionSubtitle from '../components/text/SectionSubtitle';
import RouteDescription from '../components/text/RouteDescription';
import Map from '../components/map/Map';
import FlexContainer from '../components/layout/FlexContainer';
import Tag from '../components/cards/Tag';
import Loader from '../components/loaders/Loader';
import Button from '../components/buttons/Button';
import sizes from '../styles/sizes';

// Set Mapbox Access Token
const mapboxToken = require('../config/accessToken').mapboxToken;
mapboxgl.accessToken = mapboxToken;

export class CurrentRoute extends Component {
  static propTypes = {
    auth: PropTypes.object,
    routes: PropTypes.object.isRequired,
    getCurrentRoute: PropTypes.func.isRequired,
    clearRoute: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { routes } = this.props.routes;
    this.props.getCurrentRoute(id, routes);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.routes.route, this.props.routes.route)) {
      const { route } = this.props.routes;

      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        minZoom: 10,
        bounds: getBoundingCoords(route.geometry.coordinates),
        fitBoundsOptions: {
          padding: 30
        }
      });

      const loadListener = () => {
        map.addLayer(setRouteLayer(route.geometry));
        // Remove event listener
        map.off('load', loadListener);
      };

      map.on('load', loadListener);
      map.addControl(new mapboxgl.NavigationControl());
    }
  }

  componentWillUnmount() {
    this.props.clearRoute();
  }

  handleSaveClick = id => {
    if (this.props.saved.indexOf(id) > -1) {
      return;
    }
    this.props.saveRoute(id);
  };

  handleUnsaveClick = id => {
    if (this.props.saved.indexOf(id) === -1) {
      return;
    }
    this.props.unsaveRoute(id);
  };

  render() {
    const {
      auth,
      routes: { route, loading },
      saved
    } = this.props;

    const title = loading ? (
      <Loader full={true} />
    ) : (
      <React.Fragment>
        <SectionTitle>{route.title}</SectionTitle>
        <SectionSubtitle>
          {route.city}, {route.country}
        </SectionSubtitle>
      </React.Fragment>
    );

    const saveActionButton =
      saved.indexOf(route._id) > -1 ? (
        <Button onClick={() => this.handleUnsaveClick(route._id)}>
          Unsave
        </Button>
      ) : (
        <Button onClick={() => this.handleSaveClick(route._id)}>Save</Button>
      );

    return (
      <RoutesMain>
        {title}
        <Map
          ref={el => (this.mapContainer = el)}
          height="480px"
          maxwidth="80%"
          centered
        />
        <FlexContainer maxwidth={sizes.currentRouteMaxwidth}>
          {!isEmpty(route) &&
            route.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
        </FlexContainer>
        {route.description && (
          <div
            style={{ maxWidth: sizes.currentRouteMaxwidth, margin: '0 auto' }}
          >
            <h2>Description</h2>
            <RouteDescription>{route.description}</RouteDescription>
          </div>
        )}
        <FlexContainer
          height="100px"
          maxwidth={sizes.currentRouteMaxwidth}
          centered
        >
          {auth.isAuthenticated &&
            auth.user.id !== route.author &&
            saveActionButton}
        </FlexContainer>
      </RoutesMain>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  routes: state.routes,
  saved: state.saved
});

const mapDispatchToProps = {
  getCurrentRoute,
  clearRoute,
  saveRoute,
  unsaveRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentRoute);
