import { actionTypes } from '../actions';

/**
 * @function successReducer
 * @param {array} state - Array of guessed words.
 * @param {object} action - action to be reduced.
 * @returns {boolean} - new success state.
 */
export default (state=false, action) => {
  switch(action.type) {
    case (actionTypes.CORRECT_GUESS):
      return true;
    // Challenge #2: Reset Game
    case (actionTypes.RESET_GAME):
      return false;
    // END: Challenge #2: Reset Game
    default:
      return state;
  }
}
