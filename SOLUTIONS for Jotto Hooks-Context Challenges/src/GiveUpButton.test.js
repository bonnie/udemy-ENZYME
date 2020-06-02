// Challenge #3: Give Up

import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import GiveUpButton from './GiveUpButton';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';


// for testing that setGivenUp is called with true on click
const mockSetGivenUp = jest.fn()

/**
* Create ReactWrapper for GiveUpButton component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for GiveUpButton component and providers
*/
const setup = ({ language }) => {
  language = language || 'en';
  
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider>
        <GiveUpButton setGivenUp={mockSetGivenUp} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
}

describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-give-up-button');
    expect(component.length).toBe(1);
  });
});
test('does not throw warning with expected props', () => {
  const expectedProps = { setGivenUp: function() {} };
  checkProps(GiveUpButton, expectedProps);
});

test('calls setGivenUp with the argument "true" on click', () => {
  const wrapper = setup({ });
  const component = findByTestAttr(wrapper, 'component-give-up-button');
  component.simulate('click');
  expect(mockSetGivenUp).toHaveBeenCalledWith(true);
});

describe('languagePicker', () => {
  test('correctly renders button text string in english', () => {
    const wrapper = setup({ language: "en", success: true });
    const component = findByTestAttr(wrapper, 'component-give-up-button');
    expect(component.text()).toBe('Give Up');
  });
  test('correctly renders button text string in emoji', () => {
    const wrapper = setup({ language: "emoji", success: true });
    const component = findByTestAttr(wrapper, 'component-give-up-button');
    expect(component.text()).toBe('😩');
  });
})

// END: Challenge #3: Give Up
