import styled from 'styled-components';
import sizes from '../../styles/sizes';

const Thumbnail = styled.img`
  src: ${props => props.src};
  height: ${props =>
    props.small ? sizes.thumbnailSideSmall : sizes.thumbnailSide};
  width: ${props =>
    props.small ? sizes.thumbnailSideSmall : sizes.thumbnailSide};
  alt: 'Route thumbnail';
`;

export default Thumbnail;
