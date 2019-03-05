import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// @desc:   set up MapboxDraw object
// @return: draw object
export const setDraw = () => {
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
          'line-opacity': 0.7
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

export const updateRoute = (draw, map, accessToken) => {
  // removeRoute(); // overwrite any existing layers
  const data = draw.getAll();
  const lastFeature = data.features.length - 1;
  const coords = data.features[lastFeature].geometry.coordinates.join(';');
  console.log(coords);

  // Set profile
  const profile = 'walking';

  // Make request
  // const url = `
  //   https://api.mapbox.com/directions/v5/mapbox/
  //   ${profile}/
  //   ${coords}?geometries=geojson&steps=true&&access_token=${accessToken}
  //   `;

  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?geometries=geojson&access_token=${accessToken}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const coords = data.routes[0].geometry;

      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      } else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: coords
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
      }
    });
};

export const removeRoute = map => {
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  } else {
    return;
  }
};
