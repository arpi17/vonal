import styled from 'styled-components';
import colors from './colors';
import sizes from './sizes';
// import fonts from './fonts';

export const StyledFooter = styled.footer`
  height: calc(${sizes.footerHeight} * 0.8);
  padding: calc(${sizes.footerHeight} * 0.1) 20px;
  background: ${colors.bgColorDark};
`;
