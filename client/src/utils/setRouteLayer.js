// @desc:    Create a new route layer
// @params:  geometry: Array - containing the geometry object of the created route
// @return:  route layer object
const setRouteLayer = geometry => ({
  id: 'route',
  type: 'line',
  source: {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry
    }
  },
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#3b9ddd',
    'line-width': 8,
    'line-opacity': 0.8
  }
});

export default setRouteLayer;
