import { combineReducers } from 'redux';
import success from './successReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';
import userEnter from './userEnterReducer';

// Challenge #3: Give Up Button
import gaveUp from './gaveUpReducer';
// END: Challenge #3: Give Up Button

// Challenge #5: Server Error
import serverError from './serverErrorReducer';
// END: Challenge #5: Server Error


export default combineReducers({
  success,
  guessedWords,
  secretWord,
  // Challenge #3: Give Up Button
  gaveUp,
  // END: Challenge #3: Give Up Button
  // Challenge #4: Enter Secret Word
  userEnter,
  // END: Challenge #4: Enter Secret Word
  // Challenge 5: Server Error
  serverError,
  // END: Challenge #5: Server Error
});
