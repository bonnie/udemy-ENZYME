// Challenge #1: Number of Guesses

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for count of total guesses.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component.
 */
const TotalGuesses = (props) => {
  return (
    <h4 data-test="component-total-guesses">
      Total Guesses: {props.guessCount}
    </h4>
  );
};

TotalGuesses.propTypes = {
  guessCount: PropTypes.number.isRequired,
};

export default TotalGuesses;

// END: Challenge #1: Number of Guesses
