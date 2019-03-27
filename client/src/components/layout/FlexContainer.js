import styled from 'styled-components';

const FlexContainer = styled.div`
  width: ${props => !props.maxwidth && '100%'};
  max-width: ${props => props.maxwidth};
  height: ${props => (props.height ? props.height : props.full && '100vh')};
  margin: ${props => props.maxwidth && '20px auto'};

  display: flex;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  justify-content: ${props => props.centered && 'center'};
  align-items: ${props => props.centered && 'center'};
`;

export default FlexContainer;
