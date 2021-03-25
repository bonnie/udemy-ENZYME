// Challenge #5: Server Error

import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import ServerError from './ServerError';
import languageContext from './contexts/languageContext';

/**
* Create ReactWrapper for ServerError component for testing
* @param {object} testValues - Props values for this specific test.
* @returns {ReactWrapper} - Wrapper for ServerError
*/
const setup = ({ language }) => {
  language = language || 'en';
  
  return mount(
    <languageContext.Provider value={language}>
      <ServerError />
    </languageContext.Provider>
  );
}

test('renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-server-error');
  expect(component.length).toBe(1);
});

describe('languagePicker', () => {
  test('correctly renders `better luck` string in english', () => {
    const wrapper = setup({ language: "en" });
    const component = findByTestAttr(wrapper, 'component-server-error');
    expect(component.text()).toContain('There was an error retrieving the secret word. Please try again later.');
  });
  test('correctly renders `better luck` string in emoji', () => {
    const wrapper = setup({ language: "emoji" });
    const component = findByTestAttr(wrapper, 'component-server-error');
    expect(component.text()).toContain('🚨. ⏲.');
  });
});

// END: Challenge #5: Server Error
