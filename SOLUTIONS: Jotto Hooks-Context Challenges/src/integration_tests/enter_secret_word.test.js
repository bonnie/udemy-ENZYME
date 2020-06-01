// Challenge #4: Enter Secret Word
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';
import { findByTestAttr } from '../../test/testUtils';
import hookActions from '../actions/hookActions';

/**
* Create ReactWrapper for App component for testing.
* Use `mount` so that all children components are available
* @returns {ReactWrapper} - Wrapper for App component and providers
*/
const setup = () => {
  // mock getSecretWord so that it sets the secret word without network calls
  hookActions.getSecretWord = jest.fn(setSecretWord => setSecretWord('party'));
  return mount(<App />);
}

describe("zero guessed words and Enter Secret Word not clicked", () => {
  test('Enter Secret Word button shows', () => {
    const wrapper = setup();
    const enterSecretWordButton = findByTestAttr(wrapper, 'component-enter-secret-word-button');
    expect(enterSecretWordButton.length).toBe(1);
  });
  test('Secret word entry does not show', () => {
    const wrapper = setup();
    const secretWordEntryComponent = findByTestAttr(wrapper, 'component-secret-word-entry');
    expect(secretWordEntryComponent.length).toBe(0);
  });
});

describe("enterSecretWord is true", () => {
  let wrapper;
  let giveUpButton;
  beforeEach(() => {
    // find and click the "enter secret word" button to set enterSecretWord to true
    wrapper = setup();
    giveUpButton = findByTestAttr(wrapper, 'component-enter-secret-word-button');
    giveUpButton.simulate('click');
  });
  test('Secret word entry shows', () => {
    const secretWordEntryComponent = findByTestAttr(wrapper, 'component-secret-word-entry');
    expect(secretWordEntryComponent.length).toBe(1);
  });
  test('no other components show', () => {
    expect(wrapper.children.length).toBe(1);
  })
});

// END: Challenge #4: Enter Secret Word

