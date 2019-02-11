import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const FromApi = (Component, options = {}) => {
  return class FromApiComponent extends PureComponent {
    static propTypes = {
      fetch: PropTypes.func.isRequired
    };

    state = {
      data: null
    };

    componentDidMount() {
      const promise = this.props.fetch();
      if (!promise || typeof promise.then !== 'function') return;

      promise
        .then(data => this.setState({ data }));
    }

    render() {
      const { dataKey = 'data', defaultValue = null } = options;
      const { data = defaultValue } = this.state;
      const props = { ...this.props, [dataKey]: data };
      return <Component {...props} />;
    }
  };
};

export default FromApi;
