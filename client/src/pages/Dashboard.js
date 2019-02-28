import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/">Home</Link>
        <h1>Dashboard</h1>
        <Link to="/create">Create a route</Link>
      </div>
    );
  }
}

export default Dashboard;
