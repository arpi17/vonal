import styled from 'styled-components';
import colors from '../../styles/colors';

const Tag = styled.div`
  display: inline-block;
  width: auto;
  padding: 1px 7px;
  margin: 5px 3px;
  background-color: ${colors.bgColorDark};
  color: ${colors.secondary};
  border-radius: 7px;

  &:first-child {
    margin-left: 0;
  }
`;

export default Tag;
