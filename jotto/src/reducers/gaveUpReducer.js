// Challenge #3: Give Up Button

/* NOTE: This is not the optimal way to track whether or not the user has given up. 
 With two boolean pieces of state (success aveUp), we have four possibilities:
 
 success=false aveUp=false (user is playing the game)
 success=true aveUp=false (user gave up)
 success=false aveUp=true (user guessed correctly)
 success=true aveUp=true (will never logically happen)

 If I were starting from scratch, I would have one piece of state, called, say, 'status'
 with three possibilities: inProgress, victory, gaveUp

 To refactor to that new scheme now would make this challenge solution more 
 confusing than necessary, however, so we'll live with the inefficiency.
*/

import { actionTypes } from '../actions';

/**
 * @function gaveUp
 * @param {boolean} state - Whether the user has given up.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - aveUp state.
 */
export default (state=false, action) => {
  switch(action.type) {
    case (actionTypes.GIVE_UP):
      return true;
    case (actionTypes.RESET_GAME):
      return false;
    default:
      return state;
  }
}

// END: Challenge #3: Give Up Button