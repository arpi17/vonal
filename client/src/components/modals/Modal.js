import styled from 'styled-components';
import colors from '../../styles/colors';

const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  width: 60%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${colors.bgColor};

  ol {
    padding-top: 20px;
    padding-left: 20px;
  }
  li {
    margin: 10px auto;
    padding-left: 5px;
  }
`;

export default Modal;
