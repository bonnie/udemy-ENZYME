// Challenge #5: Server Error
import { actionTypes } from '../actions';

/**
 * @function serverErrorReducer
 * @param {string} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {string} - New state (depending on action type).
 */
export default (state=false, action) => {
  switch (action.type) {
    case actionTypes.SERVER_ERROR:
      return true;
    default:
      return state;
  }
}
// END: Challenge #5: Server Error
