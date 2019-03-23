import styled from 'styled-components';

const RouteCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;

  &::after {
    content: '';
    /* flex: 0 0 25%; */
    width: 330px;
  }
`;

export default RouteCardContainer;
