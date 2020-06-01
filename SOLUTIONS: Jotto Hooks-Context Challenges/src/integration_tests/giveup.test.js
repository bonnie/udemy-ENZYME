// Challenge #3: Give Up
import React from 'react';
import { mount } from 'enzyme';
import hookActions from '../actions/hookActions';

import App from '../App';
import { findByTestAttr } from '../../test/testUtils';

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

describe("givenUp is false and word not guessed", () => {
  // givenUp should be false by default
  test('Give Up button shows', () => {
    const wrapper = setup();
    const giveUpButton = findByTestAttr(wrapper, 'component-give-up-button');
    expect(giveUpButton.length).toBe(1);
  });
  test('secret word is not revealed', () => {
    const wrapper = setup();
    const secretWordReveal = findByTestAttr(wrapper, 'component-secret-word-reveal');
    expect(secretWordReveal.length).toBe(0);
  });
  test('Input component shows', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.length).toBe(1);
  });
  test('New Word button does not show', () => {
    const wrapper = setup();
    const newWordButton = findByTestAttr(wrapper, 'component-new-word-button');
    expect(newWordButton.text().length).toBe(0);
  });
});

describe("givenUp is true", () => {
  let wrapper;
  let giveUpButton;
  beforeEach(() => {
    // find and click the give up button to set givenUp to true
    wrapper = setup();
    giveUpButton = findByTestAttr(wrapper, 'component-give-up-button');
    giveUpButton.simulate('click');
  });
  test('Give Up button no longer shows', () => {
    const giveUpButton = findByTestAttr(wrapper, 'component-give-up-button');
    expect(giveUpButton.length).toBe(0);
  });
  test('secret word is revealed', () => {
    const secretWordReveal = findByTestAttr(wrapper, 'component-secret-word-reveal');
    expect(secretWordReveal.length).toBe(1);
  });
  test('Input component no longer shows', () => {
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.length).toBe(0);
  });
  test('New Word button shows', () => {
    const newWordButton = findByTestAttr(wrapper, 'component-new-word-button');
    expect(newWordButton.length).toBe(1);
  });
  test('Congrats does not show', () => {
    const congratsComponent = findByTestAttr(wrapper, 'component-congrats');
    expect(congratsComponent.length).toBe(0);

  })
});

// END: Challenge #3: Give Up

