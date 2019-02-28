import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputField from '../components/InputField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <Link to="/">Home</Link>
        <div className="from-group">
          <form>
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
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
