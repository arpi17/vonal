import styled from 'styled-components';
import colors from '../../styles/colors';

const Button = styled.button`
  height: 30px;
  width: 100px;
  padding: 5px 10px;
  display: block;
  margin: 0 ${props => (props.centered ? 'auto' : 0)};
  border: none;
  border-radius: 5px;
  background: ${props => (props.primary ? colors.primary : colors.secondary)};
  color: black;
  cursor: pointer;
`;

export default Button;
