import styled from 'styled-components';
import colors from '../../styles/colors';

const SplitImage = styled.div`
  width: 100%;
  flex: ${props => props.flex || '1 1 auto'};
  position: relative;
  background-image: ${props =>
      props.overlay &&
      `linear-gradient(
      180deg,
      ${colors.overlay} 0%,
      ${colors.overlay} 100%
    ),`}
    url(${props => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;

  display: ${props => props.flex && 'flex'};
  justify-content: ${props => props.flex && 'center'};
  align-items: ${props => props.flex && 'center'};
`;

export default SplitImage;
