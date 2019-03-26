import styled from 'styled-components';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  justify-content: ${props => props.centered && 'center'};
  align-items: ${props => props.centered && 'center'};
`;

export default FlexContainer;
