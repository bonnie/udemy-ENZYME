// Challenge #2: Reset Game
import React from 'react';
import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';
import hookactions from './actions/hookActions'

import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

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
  const resetGame = (setSecretWord) => {

    // reset the secret word
    hookactions.getSecretWord(setSecretWord)

    // reset the guessedWords array
    setGuessedWords([]);

    // reset success
    setSuccess(false);
  }

  if (success) {
    return (
      <button 
        data-test='component-new-word-button'
        onClick={() => resetGame(props.setSecretWord)}
      >
        {stringsModule.getStringByLanguage(language, 'newWord')}
      </button>
    )
  }
  else {
    return(
      <div data-test='component-new-word-button' />
    )
  }
}

// END: Challenge #2: Reset Game
