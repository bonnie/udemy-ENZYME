// Challenge #4: Enter Secret Word
import React, { useState } from "react";
import PropTypes from "prop-types";

export const EnterWordForm = ({ formAction }) => {
  const [secretWord, setSecretWord] = useState("");

  const submitForm = (evt) => {
    evt.preventDefault();
    // don't submit empty word
    if (secretWord.length > 0) {
      formAction(secretWord);
    }
  };

  return (
    <div data-test="component-enter-word-form">
      <p data-test="enter-word-instructions">
        Enter a secret word for someone else to guess!
      </p>
      <form className="form-inline">
        <input
          data-test="enter-word-input"
          className="mb-2 mx-sm-3"
          type="text"
          value={secretWord}
          onChange={(evt) => setSecretWord(evt.target.value)}
          placeholder="enter secret word"
        />
        <button
          data-test="submit-button"
          onClick={submitForm}
          className="btn btn-primary mb-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

EnterWordForm.propTypes = {
  formAction: PropTypes.func,
};

export default EnterWordForm;
// END: Challenge #4: Enter Secret Word
