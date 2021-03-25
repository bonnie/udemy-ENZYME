import React from 'react';
import { shallow } from 'enzyme';

import { GuessedWordsProvider, useGuessedWords } from './GuessedWordsContext';

// a functional component that calls useGuessedWords for our tests
const FunctionalComponent = () => {
  useGuessedWords();
  return <div />;
}

test('useGuessedWords throws error when not wrapped in GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />)
  }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});

test('useGuessedWords does not throw error when wrapped in GuessedWordsProvider', () => {
  expect(() => {
    shallow(
      <GuessedWordsProvider>
        <FunctionalComponent />
      </GuessedWordsProvider>
    )
  }).not.toThrow()
});
