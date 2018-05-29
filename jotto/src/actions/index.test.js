import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    return store.dispatch(getSecretWord())
      .then(() => {
        const newState = store.getState();
        expect(newState.secretWord).toBe(secretWord);
      })
  });
  describe('updates serverError state to `true`', () => {
    // NOTE: there's currently no way to simulate server nonresponse with moxios
    test('when server returns 4xx status', () => {
      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });
  
      return store.dispatch(getSecretWord())
        .then(() => {
          const newState = store.getState();
          expect(newState.serverError).toBe(true);
        })
    });
    test('when server returns 5xx status', () => {
      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        });
      });
  
      return store.dispatch(getSecretWord())
        .then(() => {
          const newState = store.getState();
          expect(newState.serverError).toBe(true);
        });
    });
  })
});
