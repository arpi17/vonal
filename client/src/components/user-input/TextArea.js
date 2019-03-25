import styled from 'styled-components';
import colors from '../../styles/colors';

const TextArea = styled.textarea`
  width: 300px;
  height: 140px;
  padding: 10px;
  margin: 10px auto;

  background: #ffffff;
  border: 1px solid ${props => (!props.error ? '#696969' : colors.error)};
  box-sizing: border-box;
  border-radius: 5px;
`;

export default TextArea;
