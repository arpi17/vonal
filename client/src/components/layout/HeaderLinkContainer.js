import styled from 'styled-components';
import colors from '../../styles/colors';

const HeaderLinkContainer = styled.div`
  width: ${props => props.width};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.bgColor};

  & > * {
    margin: 0 15px;
  }
`;

export default HeaderLinkContainer;
