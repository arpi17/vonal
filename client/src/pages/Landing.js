import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidUpdate({ history }) {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Vonal</h1>
        <h3>Create and discover new routes</h3>
        <div>
          <Link to="/register">Sign Up</Link>
          <br />
          <Link to="/login">Login</Link>
          <br />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
