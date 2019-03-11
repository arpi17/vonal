import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputField from '../components/user-input/InputField';
import { loginUser } from '../actions/authActions';

// Styled-components
import { Grid, GridImage } from '../styles/Grid';
import { Card, CardContent } from '../styles/Card';
import { SubmitButton } from '../styles/Button';
import { Para, LinkText } from '../styles/Text';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginData);
  }

  render() {
    return (
      <Grid areas={'"image image image"'}>
        <GridImage img={process.env.PUBLIC_URL + '/login.jpg'}>
          <Link to="/">Home</Link>
          <Card transparent>
            <CardContent>
              <h1>Login</h1>

              <form onSubmit={this.handleSubmit}>
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
                <SubmitButton>Enter</SubmitButton>
              </form>
              <Para>
                Don't have an account yet? Sign up{' '}
                <LinkText as={Link} to="/register">
                  here
                </LinkText>
              </Para>
            </CardContent>
          </Card>
        </GridImage>
      </Grid>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
