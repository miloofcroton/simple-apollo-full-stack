import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const FromApi = (Component) => {
  return class FromApiComponent extends PureComponent {
    static propTypes = {
      fetch: PropTypes.func.isRequired
    };

    componentDidMount() {
      this.props.fetch();
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export default FromApi;
