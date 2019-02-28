import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="container">
      <h1>Vonal</h1>
      <h3>Create and discover new routes</h3>
      <div>
        <Link to="/register">Sign Up</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

export default Landing;
