import { combineReducers } from 'redux';
import success from './successReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';

// Challenge #3: Give Up Button
import gaveUp from './gaveUpReducer';
// END: Challenge #3: Give Up Button


export default combineReducers({
  success,
  guessedWords,
  secretWord,
  // Challenge #3: Give Up Button
  gaveUp,
  // END: Challenge #3: Give Up Button
});
