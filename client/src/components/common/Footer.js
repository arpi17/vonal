import React from 'react';

import StyledFooter from './StyledFooter';
import HeaderLinkContainer from '../layout/HeaderLinkContainer';
import StyledLink from '../navigation/StyledLink';

function Footer() {
  return (
    <StyledFooter>
      <HeaderLinkContainer width="300px">
        <span>Copyright &copy;</span> <StyledLink to="/about">About</StyledLink>{' '}
        <StyledLink to="/contact">Contact</StyledLink>
      </HeaderLinkContainer>
    </StyledFooter>
  );
}

export default Footer;
