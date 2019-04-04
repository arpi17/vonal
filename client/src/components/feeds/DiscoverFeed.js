import React from 'react';
import PropTypes from 'prop-types';

import DiscoverCardWrap from '../wraps/DiscoverCardWrap';

function DiscoverFeed({ routes, isInitialised }) {
  return routes.length > 0 ? (
    routes.map(route => <DiscoverCardWrap key={route._id} route={route} />)
  ) : isInitialised ? (
    <h3 style={{ marginLeft: '2rem' }}>
      No routes found. Try a different location.
    </h3>
  ) : (
    <div style={{ marginLeft: '2rem' }}>
      <h3>Discover routes by adjusting the filter on the left.</h3>
      <h3>If you would like to see all the routes simply click the button.</h3>
    </div>
  );
}

DiscoverFeed.propTypes = {
  routes: PropTypes.array
};

export default DiscoverFeed;
