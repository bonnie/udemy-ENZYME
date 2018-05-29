// Challenge #4: Enter Secret Word
import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import EnterWordForm from './EnterWordForm';

const defaultProps = { formAction: () => {} };

/**
* Factory function to create a ShallowWrapper for the EnterWordForm component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<EnterWordForm {...setupProps} />)
}
describe('render', () => {
  // the condition for this to render is within the App
  // component, so we don't need to test conditional rendering here
  test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-enter-word-form');
    expect(component.length).toBe(1);
  });
  test('renders instructions', () => {
    const wrapper = setup();
    const instructions = findByTestAttr(wrapper, 'enter-word-instructions');
    expect(instructions.length).toBe(1);
  });
  test('renders submit button', () => {
    const wrapper = setup();
    const submit = findByTestAttr(wrapper, 'submit-button');
    expect(submit.length).toBe(1);
  });
  test('renders input box', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'enter-word-input');
    expect(input.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { formAction: () => {} };
    checkProps(EnterWordForm, expectedProps);
  });
});

describe('submit click action', () => {
  let setUserSecretWordMock;
  let wrapper;
  const userSecretWord = 'lunch';
  beforeEach(() => {
    // create a mock function for `setUserSecretWord`
    setUserSecretWordMock = jest.fn();

    // set up Input, with setUserSecretWordMock as a prop
    wrapper = setup({formAction: setUserSecretWordMock});

    // simulate the input
    wrapper.instance().inputBox.current = { value: userSecretWord };

    // simulate click on submit button
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click', { preventDefault() {} });
  });
  test('`setUserSecretWord` was called once', () => {
    const setUserSecretWordCallCount = setUserSecretWordMock.mock.calls.length;
    expect(setUserSecretWordCallCount).toBe(1);
  });
  test('`setUserSecretWord` was called with input value as argument', () => {
    const userSecretWordArg = setUserSecretWordMock.mock.calls[0][0];
    expect(userSecretWordArg).toBe(userSecretWord);
  });
});

// END: Challenge #4: Enter Secret Word

