import styled from 'styled-components';
import colors from './colors';

// @args: areas: 'image image content'
export const Grid = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ${props => props.areas};
`;
export const GridImage = styled.div`
  grid-area: image;
  background-image: linear-gradient(
      180deg,
      ${colors.overlay} 0%,
      ${colors.overlay} 100%
    ),
    url(${props => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;
export const GridContent = styled.div`
  grid-area: content;
  position: relative;
  background-color: ${colors.bgColor};
`;
