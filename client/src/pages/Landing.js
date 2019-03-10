import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  LandingPage,
  LandingLinks,
  Image,
  NavCard,
  NavList,
  MainTagline,
  SubTagline,
  NavItem
} from '../styles/styles';

class Landing extends Component {
  componentDidUpdate({ history }) {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  render() {
    return (
      <LandingPage>
        <Image img={process.env.PUBLIC_URL + '/landing.jpg'}>
          <MainTagline>Vonal</MainTagline>
          <SubTagline>Create and discover your own routes</SubTagline>
        </Image>
        <LandingLinks>
          <NavCard>
            <NavList>
              <NavItem as={Link} to="/register">
                Sign Up
              </NavItem>
              <NavItem as={Link} to="/login">
                Login
              </NavItem>
              <NavItem as={Link} to="/discover">
                Discover
              </NavItem>
              <NavItem as={Link} to="/about">
                About
              </NavItem>
              <NavItem as={Link} to="/contact">
                Contact
              </NavItem>
            </NavList>
          </NavCard>
        </LandingLinks>
      </LandingPage>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
