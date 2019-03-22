import styled from 'styled-components';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const side = '200px';

const DashCard = styled.div`
  height: ${side};
  width: ${side};
  background: ${colors.bgColorDark};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.secondary};
  font-size: ${fonts.fsH4};
  text-decoration: none;
  transition: all 300ms ease-in-out;

  &:hover {
    background: black;
    color: ${colors.primary};
  }
`;

export default DashCard;
