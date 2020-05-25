import { actionTypes } from '../actions';

/**
 * @function successReducer
 * @param {boolean} state - Whether the user has guessed correctly.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - New success state.
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
