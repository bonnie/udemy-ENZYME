// Challenge #2: Reset Game
import { actionTypes } from '../actions';
import guessedWordsReducer from './guessedWordsReducer';

// Note: Adding guessed words is tested via integration tests in Input.test.js

test('returns state of `[]` upon receiving an action of type `RESET_GAME`', () => {
  // start with non-zero guessed words
  const initialState = [{ guessedWord: 'train', letterMatchCount: 3 }];
  const newState = guessedWordsReducer(initialState, { type: actionTypes.RESET_GAME });
  expect(newState).toEqual([]);
});
// END: Challenge #2: Reset Game
