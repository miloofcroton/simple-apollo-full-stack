import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './Card';

export default class ItemList extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  render() {
    const { items } = this.props;

    return items.map(item => (
      <ItemCard key={item.id} item={item} />
    ));
  }
};
