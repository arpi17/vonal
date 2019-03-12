import styled from 'styled-components';
import colors from './colors';
import fonts from './fonts';

export const StyledHeader = styled.header`
  height: 40px;
  padding: 5px 20px;
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
