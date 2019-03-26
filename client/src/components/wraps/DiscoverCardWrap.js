import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import DiscoverCard from '../cards/DiscoverCard';
import Thumbnail from '../map/Thumbnail';
import RouteTitle from '../text/RouteTitle';
import RouteLocation from '../text/RouteLocation';
import RouteAuthor from '../text/RouteAuthor';
import FlexContainer from '../layout/FlexContainer';
import Tag from '../cards/Tag';

function DiscoverCardWrap({ route }) {
  return (
    <DiscoverCard as={Link} to={`routes/${route._id}`}>
      <Thumbnail src={route.thumbnail.URL} alt="" small />
      <RouteTitle>{route.title}</RouteTitle>
      <RouteLocation>
        {route.city}, {route.country}
      </RouteLocation>
      <FlexContainer wrap="true">
        {route.tags.map(tag => (
          <Tag key={uuidv4()}>{tag}</Tag>
        ))}
      </FlexContainer>
      <RouteAuthor>Created by {route.author.name}</RouteAuthor>
    </DiscoverCard>
  );
}

DiscoverCardWrap.propTypes = {
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

export default DiscoverCardWrap;
