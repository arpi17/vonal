import styled from 'styled-components';
import colors from '../../styles/colors';
import sizes from '../../styles/sizes';

const StyledHeader = styled.header`
  height: calc(${sizes.headerHeight} * 0.8);
  padding: calc(${sizes.headerHeight} * 0.1) 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.bgColorDark};
`;

export default StyledHeader;
