import styled from 'styled-components';

const SplitImage = styled.div`
  flex: ${props => props.flex || '0 1 auto'};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SplitImage;
