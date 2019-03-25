import React from 'react';
import { Link } from 'react-router-dom';

// Styled-components
import { MainTagline, SubTagline } from '../components/text/Title';
import { Grid, GridContent, GridImage } from '../components/layout/Grid';
import { Card } from '../components/cards/Card';
import { NavList, NavItem } from '../components/navigation/Nav';

function Landing() {
  return (
    <Grid areas={'"image image content"'}>
      <GridImage img={process.env.PUBLIC_URL + '/landing.jpg'}>
        <MainTagline>Vonal</MainTagline>
        <SubTagline>Create and discover your own routes</SubTagline>
      </GridImage>
      <GridContent>
        <Card width="200px" top="150px">
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

export default Landing;
