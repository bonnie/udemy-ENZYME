// Challenge #2: Reset Game
import React from "react";
import PropTypes from "prop-types";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";
import hookactions from "./actions/hookActions"

import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

/**
 * Functional react component for reset button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` context is false).
 */
export default function NewWordButton(props) {
  const language = React.useContext(languageContext);

  const [ guessedWords, setGuessedWords ] = guessedWordsContext.useGuessedWords();
  const [ success, setSuccess ] = successContext.useSuccess();
  const resetGame = (setSecretWord, setGivenUp) => {

    // reset the secret word
    hookactions.getSecretWord(setSecretWord)

    // reset the guessedWords array
    setGuessedWords([]);

    // reset success
    setSuccess(false);

    // Challenge #3: Give Up
    // reset givenUp
    setGivenUp(false);
    // END: Challenge #3: Give Up

  }

  if (success) {
    return (
      <button 
        data-test="component-new-word-button"
        className="btn btn-primary mb-2"
        // Challenge #3: Give Up
        onClick={() => resetGame(props.setSecretWord, props.setGivenUp)}
        // END: Challenge #3: Give Up
      >
        {stringsModule.getStringByLanguage(language, "newWord")}
      </button>
    )
  }
  else {
    return <div data-test="component-new-word-button"></div>;
  }
}

NewWordButton.propTypes = {
  setSecretWord: PropTypes.func.isRequired,
  
  // Challenge #3: Give Up
  setGivenUp: PropTypes.func.isRequired,
  // END: Challenge #3: Give Up
}

// END: Challenge #2: Reset Game
