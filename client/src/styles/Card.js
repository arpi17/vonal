import styled from 'styled-components';
import colors from './colors';

export const Card = styled.div`
  width: ${props => (props.width ? props.width : '300px')};
  padding: 20px;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto;
  border-radius: 15px;
  background-color: ${colors.bgColorDark};

  opacity: ${props => (props.transparent ? '0.8' : '1')};
`;

export const CardContent = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
