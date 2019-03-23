import styled from 'styled-components';
import ThumbnailButtonsContainer from '../layout/ThumbnailOverlay';

const RouteCard = styled.div`
  position: relative;
  height: 400px;
  width: 300px;
  /* flex: 0 1 25%; */
  margin: 15px 15px;
  box-shadow: 10px 2px 5px lightgrey;

  &:hover ${ThumbnailButtonsContainer} {
    display: flex;
  }
`;

export default RouteCard;
