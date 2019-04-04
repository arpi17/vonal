import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRoutes, clearRoutes, setFilter } from '../actions/routeActions';

import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import FlexContainer from '../components/layout/FlexContainer';
import FilterArea from '../components/layout/FilterArea';
import Filter from '../components/user-input/Filter';
import FeedContainer from '../components/layout/FeedContainer';

import DiscoverFeed from '../components/feeds/DiscoverFeed';
import withLoading from '../components/HOC/withLoading';

// Declare Feed with Loading HOC
const FeedWithLoading = withLoading(DiscoverFeed);

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

    return (
      <RoutesMain>
        <SectionTitle>Discover Routes</SectionTitle>
        <FlexContainer breakpoint="660px">
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
          <FeedContainer>
            <FeedWithLoading
              isLoading={loading}
              routes={routes}
              isInitialised={isInitialised}
            />
          </FeedContainer>
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
