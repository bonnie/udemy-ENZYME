// Challenge #2: Reset Game

import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import NewWordButton from './NewWordButton';
import successContext from './contexts/successContext';
import languageContext from './contexts/languageContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import hookActions from './actions/hookActions';


// for testing that setSuccess is called with false on click
const mockSetSuccess = jest.fn()

/**
* Create ReactWrapper for NewWordButton component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for NewWordButton component and providers
*/
const setup = ({ success, language, setSecretWord, setGivenUp }) => {
  success = success || false;
  setSecretWord = setSecretWord || function() {};
  setGivenUp = setGivenUp || function() {};
  language = language || 'en';
  
  return mount(
    <guessedWordsContext.GuessedWordsProvider>
      <languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, mockSetSuccess]}>
          <NewWordButton setSecretWord={setSecretWord} setGivenUp={setGivenUp}/>
        </successContext.SuccessProvider>
      </languageContext.Provider>
    </guessedWordsContext.GuessedWordsProvider>
  );
}
describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.length).toBe(1);
  });
  test('renders no text when `success` context is false', () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.text().length).toBe(0);
  });
  test('renders non-empty text when `success` context is true', () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.text().length).not.toBe(0);
  });
});
test('does not throw warning with expected props', () => {
  const expectedProps = { setSecretWord: function() {}, setGivenUp: function() {} };
  checkProps(NewWordButton, expectedProps);
});

describe('actions on click', () => {
  // this just that resetAction was called, and not the effects
  const mockGetSecretWord = jest.fn();
  const mockSetGivenUp = jest.fn();
  let mockResetAction;
  beforeEach(() => {
    hookActions.getSecretWord = mockGetSecretWord;

    const wrapper = setup({success: true, setSecretWord: jest.fn(), setGivenUp: mockSetGivenUp });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    component.simulate('click');
  });
  test('calls getSecretWord on click', () => {
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('resets success to false on click', () => {
    expect(mockSetSuccess).toHaveBeenCalledWith(false);
  });
  test('resets givenUp to false on click', () => {
    expect(mockSetGivenUp).toHaveBeenCalledWith(false);
  });
});

describe('languagePicker', () => {
  test('correctly renders button text string in english', () => {
    const wrapper = setup({ language: "en", success: true });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.text()).toBe('New Word');
  });
  test('correctly renders button text string in emoji', () => {
    const wrapper = setup({ language: "emoji", success: true });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.text()).toBe('✨🔤');
  });
});

// END: Challenge #2: Reset Game
