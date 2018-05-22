import { actionTypes } from '../actions';

/**
 * @function guessedWordsReducer
 * @param {array} state - Array of guessed words.
 * @param {object} action - action to be reduced.
 * @returns {array} - new guessedWords state.
 */
 export default (state=[], action) => {
  switch(action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    default:
      return state;
  }
}
