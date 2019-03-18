// @desc:    Removes a drawn layer from the map
// @params:  map: Object - containing the Mapbox map object (from state)

const removeRoute = map => {
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  } else {
    return;
  }
};

export default removeRoute;
