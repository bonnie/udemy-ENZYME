import { storeFactory } from '../test/testUtils';
import { guessWord } from './actions';

/* NOTE: it's a sign that these tests weren't optimally designed that we had to
   `giveUp: false` to every `expectedState`. How would you refactor the tests to
   be more robust when adding new pieces of state? 
*/

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';
  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState()
      const expectedState = {
        ...initialState,
        success: false,
        // Challenge #3: Give Up Button
        gaveUp: false,
        // END: Challenge #3: Give Up Button
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3
        }]
      };
      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState()
      const expectedState = {
        secretWord,
        success: true,
        // Challenge #3: Give Up Button
        gaveUp: false,
        // END: Challenge #3: Give Up Button
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5,
        }],
      };
      expect(newState).toEqual(expectedState);
    });
  });
  describe('some guessed words', () => {
    const guessedWords = [ { guessedWord: 'agile', letterMatchCount: 1 } ];
    const initialState = { guessedWords, secretWord }
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    })
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        // Challenge #3: Give Up Button
        gaveUp: false,
        // END: Challenge #3: Give Up Button
        guessedWords: [...guessedWords, { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }]
      };
      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        // Challenge #3: Give Up Button
        gaveUp: false,
        // END: Challenge #3: Give Up Button
        guessedWords: [...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 }]
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
