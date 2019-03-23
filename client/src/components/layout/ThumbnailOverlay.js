import styled from 'styled-components';
import sizes from '../../styles/sizes';

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  height: ${sizes.thumbnailSide};
  width: ${sizes.thumbnailSide};
  background-color: rgba(20, 20, 20, 0.75);

  display: none;
  /* Display changes to flex on hover over RouteCard*/
  justify-content: space-around;
  align-items: center;
`;

export default ThumbnailOverlay;
