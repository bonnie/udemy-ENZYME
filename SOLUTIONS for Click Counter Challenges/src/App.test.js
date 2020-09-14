import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

 /**
  * Factory function to create a ShallowWrapper for the App component.
  * @function setup
  * @param {object} props - Component props specific to this setup.
  * @returns {ShallowWrapper}
  */
 const setup = (props={}) => {
  return shallow(<App { ...props }/>)
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 * 
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");  // do this first with an integer and show failure!
});

describe('Increment', () => {
  // now we have enough tests to organize by function
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });
  
  test('counter increments when button is clicked', () => {
    const wrapper = setup();
    
    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');

    // check the counter
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("1");
  });
});

describe('decrement button', () => {
    test('renders decrement button', () => {
      const wrapper = setup();
      const button = findByTestAttr(wrapper, 'decrement-button');
      expect(button.length).toBe(1);
    });

    test('clicking decrement button decrements counter display when state is greater than 0', () => {
      const wrapper = setup();

      // click the increment button so that the counter is greater than 0
      const incButton = findByTestAttr(wrapper, 'increment-button');
      incButton.simulate('click');

      // find decrement button and click
      const decButton = findByTestAttr(wrapper, 'decrement-button');
      decButton.simulate('click');

      // find display and test value
      const count = findByTestAttr(wrapper, 'count').text();
      expect(count).toBe("0");
    });
  });
  describe('error when counter goes below 0', () => {
    test('error does not show when not needed', () => {
      // I plan to implement this by using a "hidden" class for the error div
      // I plan to use the data-test value 'error-message' for the error div
      const wrapper = setup();
      const errorDiv = findByTestAttr(wrapper, 'error-message');

      // using enzyme's ".hasClass()" method
      // http://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      console.log(wrapper.debug());
      expect(errorHasHiddenClass).toBe(true);
    });

    describe('counter is 0 and decrement is clicked', () => {
      // using a describe here so I can use a "beforeEach" for shared setup
  
      // scoping wrapper to the describe, so it can be used in beforeEach and the tests
      let wrapper
      beforeEach(() => {
        // no need to set counter value here; default value of 0 is good
        wrapper = setup();
  
        // find button and click
        const button = findByTestAttr(wrapper, 'decrement-button');
        button.simulate('click');
      });
      test('error shows', () => {
        // check the class of the error message
        const errorDiv = findByTestAttr(wrapper, 'error-message');
        const errorHasHiddenClass = errorDiv.hasClass('hidden');
        expect(errorHasHiddenClass).toBe(false);
      });
      test('counter still displays 0', () => {
        const count = findByTestAttr(wrapper, 'count').text();
        expect(count).toBe("0");
      });
      test('clicking increment clears the error', () => {
        // find and click the increment button
        const incButton = findByTestAttr(wrapper, 'increment-button');
        incButton.simulate('click');
  
        // check the class of the error message
        const errorDiv = findByTestAttr(wrapper, 'error-message');
        const errorHasHiddenClass = errorDiv.hasClass('hidden');
        expect(errorHasHiddenClass).toBe(true);
      });
    });
});