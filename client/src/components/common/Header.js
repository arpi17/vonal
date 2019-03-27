import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

// Styled-components
import StyledHeader from './StyledHeader';
import UsernameText from '../text/UsernameText';
import LogoText from '../text/LogoText';
import StyledLink from '../navigation/StyledLink';
import HeaderLinkContainer from '../layout/HeaderLinkContainer';
class Header extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const headerActions = isAuthenticated ? (
      <HeaderLinkContainer>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/" onClick={this.props.logoutUser}>
          Sign out
        </StyledLink>
        <UsernameText>{this.props.auth.user.name}</UsernameText>
      </HeaderLinkContainer>
    ) : (
      <HeaderLinkContainer>
        <StyledLink to="/register">Register</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
      </HeaderLinkContainer>
    );

    return (
      <StyledHeader>
        <LogoText as={Link} to={'/'}>
          Vonal
        </LogoText>
        {headerActions}
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
