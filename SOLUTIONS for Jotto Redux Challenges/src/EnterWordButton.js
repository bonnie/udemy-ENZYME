// Challenge #4: Enter Secret Word
import React from 'react';
import PropTypes from 'prop-types';

const EnterWordButton = (props) => {
  if (props.display) {
    return (
      <button 
        data-test="component-enter-word-button" 
        className="btn btn-primary spacer-bottom"
        onClick={props.buttonAction}>
        Enter your own secret word
      </button>
    );
  } else {
    return (
      <div data-test="component-enter-word-button" />
    );
  }
};

EnterWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  buttonAction: PropTypes.func,
};

export default EnterWordButton;

// END: Challenge #4: Enter Secret Word
