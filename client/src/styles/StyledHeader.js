import styled from 'styled-components';
import colors from './colors';
import sizes from './sizes';
import fonts from './fonts';

export const StyledHeader = styled.header`
  height: calc(${sizes.headerHeight} * 0.8);
  padding: calc(${sizes.headerHeight} * 0.1) 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.bgColorDark};
`;

export const Logo = styled.div`
  font-size: ${fonts.fsH3};
`;

export const UserName = styled.div`
  font-size: ${fonts.fsBody};
`;
