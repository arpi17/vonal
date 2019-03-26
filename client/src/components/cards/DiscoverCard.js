import styled from 'styled-components';
import visuals from '../../styles/visuals';
import ThumbnailOverlay from '../layout/ThumbnailOverlay';

const DiscoverCard = styled.div`
  height: 65vh;
  width: 250px;
  box-shadow: ${visuals.boxShadow};
  margin: 0 15px;
  position: relative;

  &:first-child {
    margin-left: 0;
  }

  &:hover ${ThumbnailOverlay} {
    display: flex;
  }
`;

export default DiscoverCard;
