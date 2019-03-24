import styled from 'styled-components';
import colors from '../../styles/colors';

// TODO: Correct styling
const Input = styled.input`
  width: ${props => (props.width ? props.width : '300px')};
  height: 40px;
  margin-left: ${props => (props.width ? 'auto' : '0')};
  margin-right: ${props => (props.width ? 'auto' : '0')};
  margin-bottom: ${props => (!props.error ? '0' : '5px')};
  padding: 10px;
  display: block;
  position: relative;

  background: #ffffff;
  border: 1px solid ${props => (!props.error ? '#696969' : colors.error)};
  box-sizing: border-box;
  border-radius: 5px;
`;

export default Input;
