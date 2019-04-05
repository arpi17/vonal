import styled from 'styled-components';

const FlexRow = styled.div`
  width: '100%';
  margin: ${props => props.margin};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FlexRow;
