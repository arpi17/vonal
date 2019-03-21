import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRoutes, clearRoutes, setFilter } from '../actions/routeActions';

// utils
// import compareRoutes from '../utils/compareRoutes';
// TODO: Don't rerender if the routes did not change

class Discover extends Component {
  static propTypes = {
    getRoutes: PropTypes.func.isRequired,
    clearRoutes: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
    routes: PropTypes.shape({
      routes: PropTypes.array,
      filter: PropTypes.shape({
        country: PropTypes.string,
        city: PropTypes.string,
        type: PropTypes.string
      })
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      country: '',
      city: '',
      type: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillUnmount() {
    this.props.clearRoutes();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleBlur() {
    const { country, city, type } = this.state;
    const newFilter = {
      country,
      city,
      type
    };
    this.props.setFilter(newFilter);
  }

  render() {
    const { country, city, type } = this.state;
    const { routes, filter } = this.props.routes;

    // TODO: Check if the properties exist first
    // TODO: Move feed to its own component
    const routesFeed = routes.map(route => (
      <div key={route._id}>
        <img src={route.thumbnail.URL} alt="" width="200px" height="200px" />
        <h3>{route.title}</h3>
        <p>Created by {route.author.name}</p>
      </div>
    ));

    // TODO: Remove logging
    console.log('Rendered');
    return (
      <div>
        <h1>Discover Routes</h1>
        <form>
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <br />
          <input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <br />
          <label>
            All
            <input
              type="radio"
              name="type"
              value=""
              checked={!type}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </label>
          <br />
          <label>
            Walking
            <input
              type="radio"
              name="type"
              value="walking"
              checked={type === 'walking'}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </label>
          <br />
          <label>
            Cycling
            <input
              type="radio"
              name="type"
              value="cycling"
              checked={type === 'cycling'}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </label>
          <br />
          <button onClick={() => this.props.getRoutes(filter)} type="button">
            Get Routes
          </button>
        </form>
        {routesFeed}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = {
  getRoutes,
  clearRoutes,
  setFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
