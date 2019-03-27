import styled from 'styled-components';
import fonts from '../../styles/fonts';

const RouteDescription = styled.div`
  width: ${props => props.width || '100%'};
  margin: 20px auto;
  font-size: ${fonts.fsBody};
`;

export default RouteDescription;
