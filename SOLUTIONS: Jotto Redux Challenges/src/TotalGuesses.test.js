// Challenge #1: Number of Guesses

import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import TotalGuesses from './TotalGuesses';

const defaultProps = { guessCount: 0 };

/**
* Factory function to create a ShallowWrapper for the TotalGuesses component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuesses {...setupProps} />)
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-total-guesses');
  expect(component.length).toBe(1);
});
test('renders the number of guesses', () => {
  const guessCount = 8;
  const wrapper = setup({ guessCount });
  const component = findByTestAttr(wrapper, 'component-total-guesses');
  expect(component.text()).toContain(guessCount.toString());
});

// END: Challenge #1: Number of Guesses
