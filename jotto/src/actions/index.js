import axios from 'axios';

import { getLetterMatchCount } from '../helpers';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
  GIVE_UP: 'GIVE_UP',
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 *     and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
*/
export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }

  };
};

// Challenge #2: Reset Game
/**
 * Dispatch axios action to get secret word from random word server.
 * Separate this out so it can be used in getSecretWord and resetGame.
 * @function getSecretWordDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 * 
 */
const getSecretWordDispatch = (dispatch) => {
  return axios.get('http://localhost:3030')
    .then(response => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: response.data
      });
    });
};

/**
 * Returns Redux Thunk function that dispatches GET_SECRET_WORD action
 *     after axios promise resolves
 * @function getSecretWord
 * @returns {function} - Redux Thunk function.
*/
export const getSecretWord = () => {
  return getSecretWordDispatch;
};

/**
 * Action creator to reset game and get a new secret word.
 * @function resetGame
 * @returns {function} - Redux Thunk function that dispatches RESET_GAME action and calls getSecretWord().
*/
export const resetGame = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_GAME });
    return getSecretWordDispatch(dispatch);
  }
};
// END: Challenge #2: Reset Game

// Challenge #3: Give Up Button
/**
 * Simple action creator that returns GIVE_UP action type.
 * @function giveUp
 * @returns {object} - GIVE_UP action type.
*/
export const giveUp = () => {
  return { type: actionTypes.GIVE_UP };
};

// END: Challenge #3: Give Up Button
