const lineColor = '%233B9DDD';
const markerColor = '%23FF7B1B';
// Marker is of secondary color

const setOverlay = (geometry, coords) => {
  const overlay = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          stroke: lineColor,
          'stroke-width': 8,
          'stroke-opacity': 0.8
        },
        geometry
      }
    ]
  };

  coords.forEach(coord => {
    let newFeature = {
      type: 'Feature',
      properties: {
        // stroke: 'red',
        // 'stroke-width': 3
        'marker-color': markerColor,
        // 'marker-symbol': 5,
        'marker-size': 'small'
      },
      geometry: {
        type: 'Point',
        coordinates: coord
      }
    };
    overlay.features.push(newFeature);
  });

  return JSON.stringify(overlay);
};

export default setOverlay;
