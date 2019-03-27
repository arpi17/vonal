import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../styles/colors';

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
  }
`;

export default StyledLink;
