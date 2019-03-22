import styled from 'styled-components';

import colors from '../../styles/colors';
import sizes from '../../styles/sizes';

const StyledFooter = styled.footer`
  height: calc(${sizes.footerHeight} * 0.8);
  padding: calc(${sizes.footerHeight} * 0.1) 20px;
  background: ${colors.bgColorDark};
`;

export default StyledFooter;
