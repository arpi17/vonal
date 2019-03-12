import styled from 'styled-components';
import colors from './colors';
import fonts from './fonts';

const side = '200px';

export const DashMain = styled.main`
  height: calc(100vh - 100px);
  background-image: linear-gradient(
      180deg,
      ${colors.overlay} 0%,
      ${colors.overlay} 100%
    ),
    url(${process.env.PUBLIC_URL + '/dashboard.jpg'});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DashCardContainer = styled.div`
  height: 300px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DashCard = styled.div`
  height: ${side};
  width: ${side};
  background: ${colors.bgColorDark};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.secondary}
  font-size: ${fonts.fsH4};
  text-decoration: none;
  transition: all 300ms ease-in-out;

  &:hover {
    background: black;
    color: ${colors.primary}
  }
`;
