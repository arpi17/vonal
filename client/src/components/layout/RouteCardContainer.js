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

  @media (max-width: 720px) {
    justify-content: center;
  }

  @media (min-width: 721px) and (max-width: 1080px) {
    justify-content: space-around;
  }
`;

export default RouteCardContainer;
