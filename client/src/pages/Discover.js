import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRoutes, clearRoutes, setFilter } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import FlexContainer from '../components/layout/FlexContainer';
import FilterArea from '../components/layout/FilterArea';
import Filter from '../components/user-input/Filter';
import DiscoverFeed from '../components/layout/DiscoverFeed';
import DiscoverCardWrap from '../components/wraps/DiscoverCardWrap';
import Loader from '../components/loaders/Loader';

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
      type: '',
      isInitialised: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.props.setFilter({
      country: '',
      city: '',
      type: ''
    });
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
    this.setState({
      isInitialised: true
    });
  }

  render() {
    const { country, city, type, isInitialised } = this.state;
    const { routes, loading } = this.props.routes;

    const routesFeed = loading ? (
      <Loader />
    ) : routes.length > 0 ? (
      routes.map(route => <DiscoverCardWrap key={route._id} route={route} />)
    ) : isInitialised ? (
      <h3 style={{ marginLeft: '2rem' }}>No routes found</h3>
    ) : (
      <div style={{ marginLeft: '2rem' }}>
        <h3>Discover routes by adjusting the filter on the left.</h3>
        <h3>
          If you would like to see all the routes simply click the button.
        </h3>
      </div>
    );

    return (
      <RoutesMain>
        <SectionTitle>Discover Routes</SectionTitle>
        <FlexContainer>
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
          <DiscoverFeed>{routesFeed}</DiscoverFeed>
        </FlexContainer>
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
