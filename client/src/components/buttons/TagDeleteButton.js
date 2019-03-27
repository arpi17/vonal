import styled from 'styled-components';
import colors from '../../styles/colors';

const TagDeleteButton = styled.button`
  /* height: 10px; */
  width: 15px;
  padding: 0 4px;
  background-color: ${colors.error};
  margin-left: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export default TagDeleteButton;
