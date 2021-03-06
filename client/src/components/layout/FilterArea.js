import styled from 'styled-components';

const FilterArea = styled.aside`
  min-width: 300px;
  height: 70vh;
  border-right: 1px solid black;
  box-sizing: border-box;

  @media (max-width: 660px) {
    height: auto;
    padding-bottom: 20px;
    /* max-height: 300px; */
    border-right: none;
    border-bottom: 1px solid black;
  }
`;

export default FilterArea;
