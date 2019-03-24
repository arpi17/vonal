import styled from 'styled-components';
import colors from '../../styles/colors';

const Tag = styled.div`
  display: inline-block;
  width: auto;
  padding: 2px 5px;
  margin: 5px 3px;
  background-color: black;
  color: ${colors.primary};
  border-radius: 5px;

  &:first-child {
    margin-left: 0;
  }
`;

export default Tag;
