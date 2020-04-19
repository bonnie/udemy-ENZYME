const languageStrings = {
  en: {
   congrats: 'Congratulations! You guessed the word!',
   submit: 'Submit',
   guessPrompt: 'Try to guess the secret word!',
   guessInputPlaceholder: 'enter guess',
   guessColumnHeader: 'Guessed Words',
   // Challenge #1: Number of Guesses
   numberColumnHeader: '#',
   totalGuesses: 'Total Guesses',
   // END: Challenge #1: Number of Guesses
   guessedWords: 'Guesses',
   matchingLettersColumnHeader: 'Matching Letters',
  },
  emoji: {
   congrats: '🎯🎉',
   submit: '🚀',
   guessPrompt: '🤔🤫🔤',
   guessInputPlaceholder: '⌨️🤔',
   guessedWords: '🤷‍🔤',
   guessColumnHeader: '🤷‍',
   // Challenge #1: Number of Guesses
   numberColumnHeader: '🔢',
   totalGuesses: '🔢🤷‍♀️',
   // END: Challenge #1: Number of Guesses   matchingLettersColumnHeader: '✅',
  }
}

function getStringByLanguage(languageCode, stringKey, strings=languageStrings) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);

    // fall back to english
    return strings.en[stringKey];
  }

  return strings[languageCode][stringKey];
}

// for future mocking
export default {
  getStringByLanguage,
}
