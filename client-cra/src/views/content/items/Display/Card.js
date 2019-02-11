import React from 'react';
import PropTypes from 'prop-types';

const ItemCard = ({ item }) => {

  const { title, description } = item;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

ItemCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ItemCard;
