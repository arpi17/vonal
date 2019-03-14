import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// @desc:   set up MapboxDraw object
// @return: draw object
const setDraw = () => {
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      line_string: true,
      trash: true
    },
    styles: [
      // ACTIVE (being drawn)
      // line stroke
      {
        id: 'gl-draw-line',
        type: 'line',
        filter: [
          'all',
          ['==', '$type', 'LineString'],
          ['!=', 'mode', 'static']
        ],
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#3b9ddd',
          'line-dasharray': [0.2, 2],
          'line-width': 4,
          'line-opacity': 1
        }
      },
      // vertex point halos
      {
        id: 'gl-draw-polygon-and-line-vertex-halo-active',
        type: 'circle',
        filter: [
          'all',
          ['==', 'meta', 'vertex'],
          ['==', '$type', 'Point'],
          ['!=', 'mode', 'static']
        ],
        paint: {
          'circle-radius': 10,
          'circle-color': '#FFF'
        }
      },
      // vertex points
      {
        id: 'gl-draw-polygon-and-line-vertex-active',
        type: 'circle',
        filter: [
          'all',
          ['==', 'meta', 'vertex'],
          ['==', '$type', 'Point'],
          ['!=', 'mode', 'static']
        ],
        paint: {
          'circle-radius': 6,
          'circle-color': '#3b9ddd'
        }
      }
    ]
  });
  return draw;
};

export default setDraw;
