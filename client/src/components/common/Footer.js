import React from 'react';
import { Link } from 'react-router-dom';

import StyledFooter from './StyledFooter';

function Footer() {
  return (
    <StyledFooter>
      <span>Copyright &copy;</span> <Link to="/about">About</Link>{' '}
      <Link to="/contact">Contact</Link>
    </StyledFooter>
  );
}

export default Footer;
