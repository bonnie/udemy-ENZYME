// Challenge #4: Enter Secret Word
import { actionTypes } from '../actions';

/**
 * @function userEnterReducer
 * @param {string} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {string} - New state (depending on action type).
 */
export default (state=null, action) => {
  switch (action.type) {
    case actionTypes.USER_ENTERING:
      return 'inProgress';
    case actionTypes.USER_ENTERED:
      return 'done';
    case actionTypes.RESET_GAME:
      return null;
    default:
      return state;
  }
}
// END: Challenge #4: Enter Secret Word
