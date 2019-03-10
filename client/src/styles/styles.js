import styled from 'styled-components';
import colors from './colors';
import typography from './typography';

const { bgColor, bgColorDark } = colors;
const { fsH1, fsH2, fsH3 } = typography;

export const LandingPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'image image nav';
`;

export const Image = styled.div`
  grid-area: image;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const LandingLinks = styled.div`
  position: relative;
  grid-area: nav;
  background-color: ${bgColor};
`;

// Nav Card
export const NavCard = styled.div`
  width: 240px;
  height: 340px;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto;
  border-radius: 15px;
  background-color: ${bgColorDark};
`;

export const NavList = styled.ul`
  height: 90%;
  width: 90%;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  list-decoration: none;
`;

export const NavItem = styled.li`
  font-size: ${fsH3};
  text-decoration: none;
  color: inherit;

  &:hover {
    color: red;
  }
`;

export const MainTagline = styled.h1`
  font-size: ${fsH1};
`;

export const SubTagline = styled.h2`
  font-size: ${fsH2};
`;
