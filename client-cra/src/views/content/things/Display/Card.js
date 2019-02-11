import React from 'react';
import PropTypes from 'prop-types';

const ThingCard = ({ thing }) => {

  const { title, description } = thing;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

ThingCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ThingCard;
