import styled from 'styled-components';
import colors from '../../styles/colors';
import sizes from '../../styles/sizes';

const DashMain = styled.main`
  height: calc(100vh - ${sizes.headerHeight} - ${sizes.footerHeight});
  background-image: linear-gradient(
      180deg,
      ${colors.overlay} 0%,
      ${colors.overlay} 100%
    ),
    url(${process.env.PUBLIC_URL + '/dashboard.jpg'});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DashMain;
