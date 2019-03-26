import styled from 'styled-components';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
`;

export default FlexContainer;
