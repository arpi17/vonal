import styled from 'styled-components';

const DiscoverFeed = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: scroll;

  &::after {
    content: '';
    width: 280px;
    /* flex: auto; */
  }

  @media (max-width: 1266px) {
    justify-content: space-evenly;
  }

  @media (max-width: 660px) {
    padding-top: 20px;
  }
`;

export default DiscoverFeed;
