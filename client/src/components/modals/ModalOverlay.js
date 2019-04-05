import styled from 'styled-components';
import colors from '../../styles/colors';

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${colors.modalOverlay};
  z-index: 100;
`;

export default ModalOverlay;
