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
const setup = ({ success, language, setSecretWord, }) => {
  success = success || false;
  setSecretWord = setSecretWord || (() => {});
  language = language || 'en';

  return mount(
    <guessedWordsContext.GuessedWordsProvider>
      <languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, mockSetSuccess]}>
          <NewWordButton {...setSecretWord} />
        </successContext.SuccessProvider>
      </languageContext.Provider>
    </guessedWordsContext.GuessedWordsProvider>
  );
}
describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup({});
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
  const expectedProps = { resetAction: () => {} };
  checkProps(NewWordButton, expectedProps);
});

describe('actions on click', () => {
  // this is testing the effects of resetAction, and not just that resetAction was called
  const mockGetSecretWord = jest.fn();
  let mockResetAction;
  beforeEach(() => {
    hookActions.getSecretWord = mockGetSecretWord;

    const wrapper = setup({success: true, setSecretWord: jest.fn()  });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    component.simulate('click');
  });
  test('calls getSecretWord on click', () => {
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('calls setSuccess on click', () => {
    expect(mockSetSuccess).toHaveBeenCalledWith(false);
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
})

// END: Challenge #2: Reset Game
