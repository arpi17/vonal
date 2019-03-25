import styled from 'styled-components';
import visuals from '../../styles/visuals';
import ThumbnailButtonsContainer from '../layout/ThumbnailOverlay';

const RouteCard = styled.div`
  position: relative;
  height: 380px;
  width: 300px;
  /* flex: 0 1 25%; */
  margin: 15px 15px;
  box-shadow: ${visuals.boxShadow};

  &:hover ${ThumbnailButtonsContainer} {
    display: flex;
  }
`;

export default RouteCard;
