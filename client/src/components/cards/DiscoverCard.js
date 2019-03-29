import styled from 'styled-components';
import visuals from '../../styles/visuals';
import colors from '../../styles/colors';
import ThumbnailOverlay from '../layout/ThumbnailOverlay';

const DiscoverCard = styled.div`
  height: 400px;
  width: 250px;
  /* flex: 0 1 250px; */
  box-shadow: ${visuals.boxShadow};
  background-color: ${colors.cardColor};
  margin: 15px 15px;
  position: relative;

  /* &:first-child {
    margin-left: 0;
  } */

  &:hover ${ThumbnailOverlay} {
    display: flex;
  }
`;

export default DiscoverCard;
