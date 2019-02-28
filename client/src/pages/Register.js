import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
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
        <h1>Sign Up</h1>
        <Link to="/">Home</Link>
        <p>
          Already have an account? Log in <Link to="/login">here</Link>
        </p>
        <div className="form-group">
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
        </div>
      </div>
    );
  }
}

export default Register;
