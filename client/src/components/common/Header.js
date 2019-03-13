import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

// Styled-components
import { StyledHeader, Logo, UserName } from '../../styles/StyledHeader';

class Header extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const headerActions = isAuthenticated ? (
      <div>
        <UserName>{this.props.auth.user.name}</UserName>
        <Link to="/login" onClick={this.props.logoutUser}>
          Sign out
        </Link>
      </div>
    ) : (
      <Link to="/login">Login</Link>
    );

    return (
      <StyledHeader>
        <Link to="/">
          <Logo>Vonal</Logo>
        </Link>
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
