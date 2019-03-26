import React from 'react';
import PropTypes from 'prop-types';

import RouteCard from '../cards/RouteCard';
import Thumbnail from '../map/Thumbnail';
import ThumbnailOverlay from '../layout/ThumbnailOverlay';
import Button from '../buttons/Button';
import StyledLink from '../navigation/StyledLink';
import RouteTitle from '../text/RouteTitle';
import RouteLocation from '../text/RouteLocation';

function RouteCardWrap({ route, onDeleteClick }) {
  return (
    <RouteCard key={route._id}>
      <Thumbnail src={route.thumbnail.URL} />
      <ThumbnailOverlay>
        <Button onClick={() => onDeleteClick(route._id)}>Delete</Button>
        <StyledLink
          to={{
            pathname: '/create',
            state: {
              route: route
            }
          }}
        >
          <Button>Edit</Button>
        </StyledLink>
      </ThumbnailOverlay>
      <RouteTitle>{route.title}</RouteTitle>
      <RouteLocation>
        {route.city}, {route.country}
      </RouteLocation>
    </RouteCard>
  );
}

RouteCardWrap.propTypes = {
  route: PropTypes.shape({
    title: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      URL: PropTypes.string.isRequired
    })
  }),
  onDeleteClick: PropTypes.func.isRequired
};

export default RouteCardWrap;
