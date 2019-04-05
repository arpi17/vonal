import styled from 'styled-components';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const CloseButton = styled.div`
  padding: 0 8px;
  border-radius: 10px;
  font-size: ${fonts.fsH4};
  color: ${colors.secondary};
  background-color: ${colors.bgColorDark};
  cursor: pointer;
`;

export default CloseButton;
