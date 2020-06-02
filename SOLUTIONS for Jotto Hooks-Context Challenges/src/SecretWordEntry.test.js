import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import SecretWordEntry from './SecretWordEntry';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

/**
* Create ReactWrapper for SecretWordEntry component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for SecretWordEntry component and providers
*/
const setup = ({ language, setEnterSecretWord, setSecretWord }) => {
  language = language || "en";
  setEnterSecretWord = setEnterSecretWord || function() {};
  setSecretWord = setSecretWord || function() {};

  return mount(
    <languageContext.Provider value={language} >
      <SecretWordEntry setEnterSecretWord={setEnterSecretWord} setSecretWord={setSecretWord} />
    </languageContext.Provider>
  );
}

test('SecretWordEntry renders without error', () => {
  const wrapper = setup({});
  const SecretWordEntryComponent = findByTestAttr(wrapper, 'component-secret-word-entry');
  expect(SecretWordEntryComponent.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  checkProps(SecretWordEntry, { setEnterSecretWord: function() {}, setSecretWord: function() {} });
});

test('state updates with value of secret word input box upon change', () => {
  const mockSetCustomSecretWord = jest.fn();
  React.useState = jest.fn(() => ["", mockSetCustomSecretWord]);
  const wrapper = setup({ });
  const secretWordInputBox = findByTestAttr(wrapper, 'secret-word-input-box');

  const mockEvent = { target: { value: 'train' } };
  secretWordInputBox.simulate("change", mockEvent);

  expect(mockSetCustomSecretWord).toHaveBeenCalledWith('train');
});

describe('submit calls the correct functions', () => {
  const mockSetEnterSecretWord = jest.fn();
  const mockSetSecretWord = jest.fn();
  const mockSetCustomSecretWord = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetEnterSecretWord.mockClear();
    mockSetSecretWord.mockClear();
    React.useState = jest.fn(() => ["train", mockSetCustomSecretWord]);
    wrapper = setup({ setEnterSecretWord: mockSetEnterSecretWord, setSecretWord: mockSetSecretWord});

    // simulate entering 'train' into the custom secret word box
    const secretWordInputBox = findByTestAttr(wrapper, 'secret-word-input-box');
    const mockEvent = { target: { value: 'train' } };
    secretWordInputBox.simulate("change", mockEvent);
  
    // simulate clicking the button
    const submitButton = findByTestAttr(wrapper, 'submit-secret-word-button');
    submitButton.simulate('click');
  });
  test("expect setSecretWord to be called with 'train'", () => {
    expect(mockSetSecretWord).toHaveBeenCalledWith("train");
  });
  test("expect setEnterSecretWord to be called with false", () => {
    expect(mockSetEnterSecretWord).toHaveBeenCalledWith(false);
  });
  test("expect custom secret word state to be reset to empty string", () => {
    expect(mockSetCustomSecretWord).toHaveBeenCalledWith("");
  });
});

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, 'submit-secret-word-button');
    expect(submitButton.text()).toBe('Enter your own secret word');
  });
  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, 'submit-secret-word-button');
    expect(submitButton.text()).toBe('👩‍💻🤫🔤');
  });
});
