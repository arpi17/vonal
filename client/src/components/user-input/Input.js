import styled from 'styled-components';
import colors from '../../styles/colors';

const Input = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: ${props => (!props.error ? '0' : '5px')};
  padding: 10px;
  display: block;

  background: #ffffff;
  border: 1px solid ${props => (!props.error ? '#696969' : colors.error)};
  box-sizing: border-box;
  border-radius: 5px;
`;

export default Input;
