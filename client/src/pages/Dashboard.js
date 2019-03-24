import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/common/Footer';

import DashMain from '../components/main/DashMain';
import DashCardContainer from '../components/layout/DashCardContainer';
import DashCard from '../components/cards/DashCard';

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
          <DashCard as={Link} to="/saved-routes">
            saved routes
          </DashCard>
        </DashCardContainer>
      </DashMain>
      <Footer />
    </React.Fragment>
  );
}

export default Dashboard;
