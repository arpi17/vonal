import styled from 'styled-components';
import sizes from '../../styles/sizes';

const SplitMain = styled.main`
  height: calc(100vh - ${sizes.headerHeight});
  display: flex;
`;

export default SplitMain;
