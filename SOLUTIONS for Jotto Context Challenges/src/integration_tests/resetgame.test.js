// Challenge #2: Reset Game
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

describe("after New Word button is clicked", () => {
  let wrapper;
  let newWordButton;
  beforeEach(() => {
    wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const submitButton = findByTestAttr(wrapper, 'submit-button');
        
    // guess the word to display the New Word button
    const mockEvent = { target: { value: "party" } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
    
    // find and click the New Word button
    newWordButton = findByTestAttr(wrapper, 'component-new-word-button');
    newWordButton.simulate('click');
  });
  test('New Word Button button no longer shows', () => {
    const newWordButtonComponent = findByTestAttr(wrapper, 'ccomponent-new-word-button');
    expect(newWordButtonComponent.length).toBe(0);
  });
  test('Congrats component no longer shows', () => {
    const congratsComponent = findByTestAttr(wrapper, 'component-congrats');
    expect(congratsComponent.text().length).toBe(0);
  });
  test('Input component shows', () => {
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.text().length).not.toBe(0);
  });
});

// END: Challenge #2: Reset Game

