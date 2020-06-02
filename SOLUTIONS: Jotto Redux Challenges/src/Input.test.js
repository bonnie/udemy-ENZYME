import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

/**
* Factory function to create a ShallowWrapper for the Input component.
* @function setup
* @param {object} initialState - Initial state for this setup.
* @returns {ShallowWrapper}
*/
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive();
  return wrapper;
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
    // Challenge #3: Give Up Button
    test('renders "give up" button', () => {
      const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
      expect(giveUpButton.length).toBe(1);
    });
    // END: Challenge #3: Give Up Button
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submit = findByTestAttr(wrapper, 'submit-button');
      expect(submit.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  })
});

// Challenge #3: Give Up Button
test('calls `giveUp` prop upon "Give Up" button click', () => {
  // create a mock function so we can see whether it's called on click
  const giveUpMock = jest.fn();

  // set up Input, with giveUpMock as a prop
  const wrapper = shallow(<UnconnectedInput giveUp={giveUpMock} />);

  // simulate click on giveUp button
  const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
  giveUpButton.simulate('click', { preventDefault() {} });
  
  // expect the mock to have been called once
  expect(giveUpMock.mock.calls.length).toBe(1);
});
// END: Challenge #3: Give Up Button

describe('`guessWord` action creator', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(() => {
    // create a mock function for `guessWord`
    guessWordMock = jest.fn();

    // set up Input, with guessWordMock as a prop
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

    // simulate the input
    wrapper.instance().inputBox.current = { value: guessedWord };

    // simulate click on submit button
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click', { preventDefault() {} });
  });
  test('`guessWord` was called once', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });
  test('`guessWord` was called with input value as argument', () => {
    const guessedWordArg = guessWordMock.mock.calls[0][0];
    expect(guessedWordArg).toBe(guessedWord);
  });
  test('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  })

});
