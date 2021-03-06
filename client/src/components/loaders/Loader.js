import React from 'react';
import FlexConteiner from '../layout/FlexContainer';
import loader from './loader.gif';

function Loader({ full }) {
  return (
    <FlexConteiner full={full} centered>
      <img
        src={loader}
        alt="Loading..."
        style={{ width: '200px', display: 'block' }}
      />
    </FlexConteiner>
  );
}

export default Loader;
