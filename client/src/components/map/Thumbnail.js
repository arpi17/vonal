import styled from 'styled-components';
import sizes from '../../styles/sizes';

const Thumbnail = styled.img`
  src: ${props => props.src};
  height: ${sizes.thumbnailSide};
  width: ${sizes.thumbnailSide};
  alt: 'Route thumbnail';
`;

export default Thumbnail;
