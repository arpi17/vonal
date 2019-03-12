import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styled-components
import { MainTagline, SubTagline } from '../styles/Title';
import { Grid, GridContent, GridImage } from '../styles/Grid';
import { Card } from '../styles/Card';
import { NavList, NavItem } from '../styles/Nav';

class Landing extends Component {
  componentDidUpdate({ history }) {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  render() {
    return (
      <Grid areas={'"image image content"'}>
        <GridImage img={process.env.PUBLIC_URL + '/landing.jpg'}>
          <MainTagline>Vonal</MainTagline>
          <SubTagline>Create and discover your own routes</SubTagline>
        </GridImage>
        <GridContent>
          <Card width="240px" top="150px">
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
          </Card>
        </GridContent>
      </Grid>
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
