import styled from 'styled-components';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const NavList = styled.ul`
  height: 90%;
  width: 90%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  list-style: none;
`;

export const NavItem = styled.li`
  margin: 15px auto;
  font-size: ${fonts.fsH3};
  text-decoration: none;
  color: inherit;

  &:hover {
    color: ${colors.primary};
  }
`;
