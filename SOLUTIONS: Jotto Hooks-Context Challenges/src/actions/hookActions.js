import axios from 'axios';

export const getSecretWord = async (setSecretWord, setServerError) => {
  // Challenge #5: Server Error
  try {
    const response = await axios.get('http://localhost:3030');
    setSecretWord(response.data);
  }
  catch {
    setServerError(true);
  }
  // END: Challenge #5: Server Error
}

// default export for mocking convenience
export default {
  getSecretWord,
}
