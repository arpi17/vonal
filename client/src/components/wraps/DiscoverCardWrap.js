import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import { saveRoute, unsaveRoute } from '../../actions/savedActions';

import DiscoverCard from '../cards/DiscoverCard';
import Thumbnail from '../map/Thumbnail';
import ThumbnailOverlay from '../layout/ThumbnailOverlay';
import RouteTitle from '../text/RouteTitle';
import RouteLocation from '../text/RouteLocation';
import RouteAuthor from '../text/RouteAuthor';
import FlexContainer from '../layout/FlexContainer';
import Tag from '../cards/Tag';
import Button from '../buttons/Button';
import StyledLink from '../navigation/StyledLink';

function DiscoverCardWrap({ route, auth, saved, saveRoute, unsaveRoute }) {
  const isSaved = saved.indexOf(route._id) > -1;
  const isOwnRoute = route.author._id === auth.user.id;

  const handleSaveClick = () => {
    if (isSaved) {
      return;
    }
    saveRoute(route._id);
  };

  const handleUnsaveClick = () => {
    if (!isSaved) {
      return;
    }
    unsaveRoute(route._id);
  };

  const saveActionButton = isSaved ? (
    <Button onClick={handleUnsaveClick}>Unsave</Button>
  ) : (
    <Button onClick={handleSaveClick}>Save</Button>
  );

  const viewOrUpdateButton =
    auth.isAuthenticated && isOwnRoute ? (
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
    ) : (
      <StyledLink to={`routes/${route._id}`}>
        <Button>View</Button>
      </StyledLink>
    );

  return (
    <DiscoverCard>
      <Thumbnail src={route.thumbnail.URL} alt="" small />
      <ThumbnailOverlay small>
        {viewOrUpdateButton}
        {auth.isAuthenticated && saveActionButton}
      </ThumbnailOverlay>
      <RouteTitle>{route.title}</RouteTitle>
      <RouteLocation>
        {route.city}, {route.country}
      </RouteLocation>
      <FlexContainer wrap="true">
        {route.tags.map(tag => (
          <Tag key={uuidv4()}>{tag}</Tag>
        ))}
      </FlexContainer>
      <RouteAuthor>
        Created by {isOwnRoute ? 'Me' : route.author.name}
      </RouteAuthor>
    </DiscoverCard>
  );
}

DiscoverCardWrap.propTypes = {
  saveRoute: PropTypes.func,
  unsaveRoute: PropTypes.func,
  auth: PropTypes.object.isRequired,
  route: PropTypes.shape({
    title: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      URL: PropTypes.string.isRequired
    }),
    tags: PropTypes.array,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  saved: state.saved
});

const mapDispatchToProps = {
  saveRoute,
  unsaveRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverCardWrap);
