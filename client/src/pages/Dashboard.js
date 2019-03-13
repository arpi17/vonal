import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../actions/authActions';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

import {
  DashMain,
  DashCardContainer,
  DashCard
} from '../styles/StyledDashboard';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <DashMain>
          <DashCardContainer>
            <DashCard as={Link} to="/create">
              create route
            </DashCard>
            <DashCard as={Link} to="/discover">
              discover
            </DashCard>
            <DashCard as={Link} to="/my-routes">
              my routes
            </DashCard>
            <DashCard as={Link} to="/bucketlist">
              bucketlist
            </DashCard>
          </DashCardContainer>
        </DashMain>
        <Footer />
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
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
)(Dashboard);
