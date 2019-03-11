import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputField from '../components/user-input/InputField';
import { registerUser } from '../actions/authActions';

// Styled-components
import { Grid, GridContent, GridImage } from '../styles/Grid';
import { Card, CardContent } from '../styles/Card';
import { SubmitButton } from '../styles/Button';
import { Para, LinkText } from '../styles/Text';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
      <Grid areas={'"image content content"'}>
        <GridImage img={process.env.PUBLIC_URL + '/roadsign.jpg'}>
          <Link to="/">Home</Link>
        </GridImage>
        <GridContent>
          <Card>
            <CardContent>
              <h1>Sign Up</h1>
              <form onSubmit={this.handleSubmit}>
                <InputField
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <InputField
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <InputField
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <InputField
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
                <SubmitButton primary>Register</SubmitButton>
                <Para>
                  Already have an account? Log in{' '}
                  <LinkText as={Link} to="/login">
                    here
                  </LinkText>
                </Para>
              </form>
            </CardContent>
          </Card>
        </GridContent>
      </Grid>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  registerUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
