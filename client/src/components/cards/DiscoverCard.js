import styled from 'styled-components';
import visuals from '../../styles/visuals';

const DiscoverCard = styled.div`
  height: 65vh;
  /* border: 1px solid black; */
  box-shadow: ${visuals.boxShadow};
  margin: 0 15px;
  position: relative;
  color: inherit;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }
`;

export default DiscoverCard;
