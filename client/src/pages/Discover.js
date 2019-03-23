import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRoutes, clearRoutes, setFilter } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import FilterArea from '../components/layout/FilterArea';
import Filter from '../components/user-input/Filter';

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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const { filter } = this.props.routes;
    this.props.getRoutes(filter);
  }

  render() {
    const { country, city, type } = this.state;
    const { routes } = this.props.routes;

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
      <RoutesMain>
        <SectionTitle>Discover Routes</SectionTitle>
        <FilterArea>
          <Filter
            country={country}
            city={city}
            type={type}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
          />
        </FilterArea>
        {routesFeed}
      </RoutesMain>
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
