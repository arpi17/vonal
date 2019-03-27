import styled from 'styled-components';
import colors from '../../styles/colors';

const ContactContainer = styled.div`
  width: 50%;
  margin: 80px auto;
  padding: 30px 40px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  background-color: ${colors.bgColorDark};
  color: ${colors.bgColor};
`;

export default ContactContainer;
