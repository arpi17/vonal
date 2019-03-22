import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputField from '../components/user-input/InputField';
import { registerUser } from '../actions/authActions';

// Styled-components
import { Grid, GridContent, GridImage } from '../components/layout/Grid';
import {
  Card,
  CardContent,
  CardTitle,
  CardText
} from '../components/cards/Card';
import Button from '../components/buttons/Button';
import LinkText from '../components/text/LinkText';

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
    const { name, email, password, password2, errors } = this.state;
    return (
      <Grid areas={'"image content content"'}>
        <GridImage img={process.env.PUBLIC_URL + '/roadsign.jpg'} />
        <GridContent>
          <Card>
            <CardContent>
              <CardTitle>Sign Up</CardTitle>
              <form onSubmit={this.handleSubmit}>
                <InputField
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  error={errors.name}
                />
                <InputField
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <InputField
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <InputField
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={this.handleChange}
                  error={errors.password2}
                />
                <Button primary>Register</Button>
                <CardText>
                  Already have an account? Log in{' '}
                  <LinkText as={Link} to="/login">
                    here
                  </LinkText>
                </CardText>
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
