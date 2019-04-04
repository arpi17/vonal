import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RedirectText from '../text/RedirectText';
import LinkText from '../text/LinkText';
import DiscoverCardWrap from '../wraps/DiscoverCardWrap';

function SavedRoutesFeed({ routes }) {
  return routes.length > 0 ? (
    routes.map(route => <DiscoverCardWrap route={route} key={route._id} />)
  ) : (
    <RedirectText>
      You have not saved anything. Click{' '}
      <LinkText as={Link} to={'/discover'}>
        here
      </LinkText>{' '}
      to discover routes
    </RedirectText>
  );
}

SavedRoutesFeed.propTypes = {
  routes: PropTypes.array
};

export default SavedRoutesFeed;
