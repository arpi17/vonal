import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

// Styled-components
import StyledHeader from './StyledHeader';
import UsernameText from '../text/UsernameText';
import LogoText from '../text/LogoText';

class Header extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const headerActions = isAuthenticated ? (
      <div>
        <UsernameText>{this.props.auth.user.name}</UsernameText>
        <Link to="/" onClick={this.props.logoutUser}>
          Sign out
        </Link>
      </div>
    ) : (
      <Link to="/login">Login</Link>
    );

    return (
      <StyledHeader>
        <Link to="/">
          <LogoText>Vonal</LogoText>
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
