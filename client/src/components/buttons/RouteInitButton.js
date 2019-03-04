import React from 'react';
import PropTypes from 'prop-types';

function RouteInitButton(props) {
  return <button onClick={props.onClick}>Start Drawing</button>;
}

RouteInitButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RouteInitButton;
