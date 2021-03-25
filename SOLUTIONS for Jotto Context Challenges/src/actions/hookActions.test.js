import moxios from 'moxios';

import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('non-error response', () => {
    // create mocks for callback args
    const mockSetSecretWord = jest.fn();
    const mockSetServerError = jest.fn();
    const secretWord = 'party';
      
    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: secretWord,
        });
      });
      
      await getSecretWord(mockSetSecretWord, mockSetServerError);
      
    });
    test('calls the getSecretWord callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
    });
    test('does not call the setServerError callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetServerError).not.toHaveBeenCalled();
    });
  });

  // Challenge #5: Server Error
  describe('5xx error response', () => {
    // create mocks for callback args
    const mockSetSecretWord = jest.fn();
    const mockSetServerError = jest.fn();
      
    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        });
      });
      
      await getSecretWord(mockSetSecretWord, mockSetServerError);
      
    });
    test('calls the getSecretWord callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetServerError).toHaveBeenCalledWith(true);
    });
    test('does not call the setServerError callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetSecretWord).not.toHaveBeenCalled();
    });
  });
  describe('4xx error response', () => {
    // create mocks for callback args
    const mockSetSecretWord = jest.fn();
    const mockSetServerError = jest.fn();
      
    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });
      
      await getSecretWord(mockSetSecretWord, mockSetServerError);
      
    });
    test('calls the getSecretWord callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetServerError).toHaveBeenCalledWith(true);
    });
    test('does not call the setServerError callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetSecretWord).not.toHaveBeenCalled();
    });
  });
  // Challenge #5: Server Error
});

