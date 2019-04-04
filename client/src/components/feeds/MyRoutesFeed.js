import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RouteCardWrap from '../wraps/RouteCardWrap';
import RedirectText from '../text/RedirectText';
import LinkText from '../text/LinkText';

function MyRoutesFeed({ routes, onDeleteClick }) {
  return routes.length > 0 ? (
    routes.map(route => (
      <RouteCardWrap
        key={route._id}
        route={route}
        onDeleteClick={onDeleteClick}
      />
    ))
  ) : (
    <RedirectText>
      You have not created a route yet. Click{' '}
      <LinkText as={Link} to={'/create'}>
        here
      </LinkText>{' '}
      to create one
    </RedirectText>
  );
}

MyRoutesFeed.propTypes = {
  routes: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired
};

export default MyRoutesFeed;
