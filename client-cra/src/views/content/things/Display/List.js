import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThingCard from './Card';

export default class ThingList extends Component {

  static propTypes = {
    things: PropTypes.array
  };

  render() {
    const { things } = this.props;

    return things.map(thing => (
      <ThingCard key={thing.id} thing={thing} />
    ));
  }
};
