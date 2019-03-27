import styled from 'styled-components';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const side = '200px';

const DashCard = styled.div`
  height: ${side};
  width: ${side};
  /* background: ${colors.bgColorDark}; */
  box-sizing: border-box;
  border: 3px solid ${colors.bgColor};
  color: ${colors.bgColor};
  font-size: ${fonts.fsH4};
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 250ms ease-in-out;

  &:hover {
    background: ${colors.bgColorDark};
    border: 3px solid ${colors.secondary};
    color: ${colors.primary};
  }
`;

export default DashCard;
