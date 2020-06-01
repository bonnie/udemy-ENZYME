import React from 'react';

import guessedWordsContext from './contexts/guessedWordsContext';
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  let contents
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={ index }>
        <td data-test="guessed-word-index">{ index + 1 }</td>
        <td>{ word.guessedWord }</td>
        <td>{ word.letterMatchCount }</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              {// Challenge #1: Number of Guesses
              }
              <th>{stringsModule.getStringByLanguage(language, 'numberColumnHeader')}</th>
              {// END: Challenge #1: Number of Guesses
              }
              <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
            </tr>
          </thead>
          <tbody>
            { guessedWordsRows }
          </tbody>
        </table>
        {// Challenge #1: Number of Guesses
        }
        <div data-test='total-guesses'>{stringsModule.getStringByLanguage(language, 'totalGuesses')}: {guessedWords.length}</div>
        {// END: Challenge #1: Number of Guesses
        }
      </div>
    );
  }
  return (
    <div data-test="component-guessed-words">
      { contents }
    </div>
  );
};

export default GuessedWords;
