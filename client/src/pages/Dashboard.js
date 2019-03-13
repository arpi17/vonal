import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/common/Footer';

import {
  DashMain,
  DashCardContainer,
  DashCard
} from '../styles/StyledDashboard';

function Dashboard() {
  return (
    <React.Fragment>
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

export default Dashboard;
