import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, GridImage, GridContent } from '../components/layout/Grid';
import {
  Card,
  CardContent,
  CardTitle,
  CardText
} from '../components/cards/Card';
import LinkText from '../components/text/LinkText';

function NotFound() {
  return (
    <Grid areas='"content image image"'>
      <GridContent>
        <Card top="180px">
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
      </GridContent>
      <GridImage img={process.env.PUBLIC_URL + '/notfound.jpg'} />
    </Grid>
  );
}

export default NotFound;
