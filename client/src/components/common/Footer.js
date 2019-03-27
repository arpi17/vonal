import React from 'react';

import StyledFooter from './StyledFooter';
import HeaderLinkContainer from '../layout/HeaderLinkContainer';
import StyledLink from '../navigation/StyledLink';
import colors from '../../styles/colors';

function Footer() {
  return (
    <StyledFooter>
      <HeaderLinkContainer width="200px">
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
      </HeaderLinkContainer>
      <div style={{ position: 'absolute', right: '40px' }}>
        <span style={{ color: colors.bgColor }}>
          Copyright &copy; 2019 Arpad Illyes
        </span>
      </div>
    </StyledFooter>
  );
}

export default Footer;
