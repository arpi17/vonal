import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/common/Footer';
import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import LinkText from '../components/text/LinkText';
import Para from '../components/text/Para';

function About() {
  return (
    <React.Fragment>
      <RoutesMain minHeight="80vh">
        <SectionTitle>About</SectionTitle>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Para>
            Vonal is a map sharing app aimed at travellers who wish to explore
            destinations as they couldn't before. By browsing through routes
            created by others the users can select what kind of journey they
            would like to experience upon visitng another place.
          </Para>
          <Para>
            Every visitor is able to view all the routes, but if you would like
            to create your own ones and save your favourites you need to create
            an account.
          </Para>
          <Para>
            Currently this app is only in testing phase! Use it for your own
            responsibility. Any feedback is welcome. For more details visit the{' '}
            <LinkText as={Link} to="/contact">
              contact page
            </LinkText>
          </Para>
        </div>
      </RoutesMain>
      <Footer />
    </React.Fragment>
  );
}

export default About;
