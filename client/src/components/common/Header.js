import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Styled-components
import { StyledHeader, Logo, UserName } from '../../styles/StyledHeader';

function Header({ user, onClick }) {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo>Vonal</Logo>
      </Link>
      <div>
        <UserName>{user}</UserName>
        <Link to="/login" onClick={onClick}>
          Sign out
        </Link>
      </div>
    </StyledHeader>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

export default Header;
