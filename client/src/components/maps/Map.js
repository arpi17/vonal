import React from 'react';

function Map({ mapContainerRef }) {
  return (
    <div
      className="map"
      ref={mapContainerRef}
      style={{ width: '500px', height: '500px' }}
    />
  );
}

export default Map;
