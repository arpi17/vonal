import styled from 'styled-components';
import colors from '../../styles/colors';

const Button = styled.button`
  height: 30px;
  width: ${props => (props.auto ? 'auto' : '100px')};
  padding: 5px 10px;
  display: block;
  margin: 0 ${props => (props.centered ? 'auto' : 0)};
  border: none;
  border-radius: 7px;
  background: ${props =>
    props.primary
      ? colors.primary
      : props.danger
      ? colors.error
      : colors.secondary};
  color: black;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
