import React from 'react';
import { Link } from 'react-router-dom';

// Styled-components
import SplitMain from '../components/main/SplitMain';
import SplitImage from '../components/layout/SplitImage';
import { MainTagline, SubTagline } from '../components/text/Title';
import LandingCard from '../components/cards/LandingCard';
import { NavList, NavItem } from '../components/navigation/Nav';

function Landing() {
  return (
    <SplitMain>
      <SplitImage img={process.env.PUBLIC_URL + '/landing.jpg'} overlay>
        <MainTagline>Vonal</MainTagline>
        <SubTagline>Create and discover your own routes</SubTagline>
        <LandingCard>
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
        </LandingCard>
      </SplitImage>
    </SplitMain>
  );
}

export default Landing;
