import React, { Component } from 'react';
import Loader from '../loaders/Loader';

function withLoading(WrappedComponent) {
  return class extends Component {
    render() {
      const { isLoading, ...props } = this.props;
      return isLoading ? <Loader /> : <WrappedComponent {...props} />;
    }
  };
}

export default withLoading;
