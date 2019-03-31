import React from 'react';
import { Link } from 'react-router-dom';

// import { Grid, GridImage, GridContent } from '../components/layout/Grid';
import SplitMain from '../components/main/SplitMain';
import SplitImage from '../components/layout/SplitImage';
import SplitContent from '../components/layout/SplitContent';
import {
  Card,
  CardContent,
  CardTitle,
  CardText
} from '../components/cards/Card';
import LinkText from '../components/text/LinkText';

function NotFound() {
  return (
    <SplitMain>
      <SplitContent flex="1 0 50%">
        <Card>
          <CardContent>
            <CardTitle>404 Not Found</CardTitle>
            <CardText>
              You made it off the map. Click{' '}
              <LinkText as={Link} to="/">
                here
              </LinkText>{' '}
              to get back to known territory
            </CardText>
          </CardContent>
        </Card>
      </SplitContent>
      <SplitImage
        img={process.env.PUBLIC_URL + '/notfound.jpg'}
        flex="1 0 50%"
      />
    </SplitMain>
  );
}

export default NotFound;
