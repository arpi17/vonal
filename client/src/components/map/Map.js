import styled from 'styled-components';

const Map = styled.div`
  height: ${props => props.height || '400px'};
  /* max-width: 800px; */
  max-width: ${props => props.maxwidth};
  margin: 0 ${props => props.centered && 'auto'};
`;

export default Map;
