import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import LanguagePicker from './LanguagePicker';
import Input from './Input';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import NewWordButton from './NewWordButton';
import SecretWordReveal from './SecretWordReveal';
import GiveUpButton from './GiveUpButton';
import EnterSecretWordButton from './EnterSecretWordButton';
import SecretWordEntry from './SecretWordEntry';

/**
 * Reducer to update state, called automatically by dispatch
 * @param state {object} - existing state
 * @param action {object} - contains 'type' and 'payload' properties for the state update
 *                   for example: { type: "setSecretWord", payload: "party" }
 * @return {object} - new state
 */
function reducer(state, action) {
  switch(action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    // Challenge #3: Give Up
    case "setGivenUp":
      return { ...state, givenUp: action.payload }
    // END: Challenge #3: Give Up
    // Challenge #4: Enter Secret Word
    case "setEnterSecretWord":
      return { ...state, enterSecretWord: action.payload }
    // END: Challenge #4: Enter Secret Word
    // Challenge #5: Server Error
    case "setServerError":
      return { ...state, serverError: action.payload }
    // END: Challenge #5: Server Error
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }

}

function App() {
  
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  )

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });
  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language });
  // Challenge #3: Give Up
  const setGivenUp = (givenUp) => 
    dispatch({ type: "setGivenUp", payload: givenUp })
  // END: Challenge #3: Give Up

  // Challenge #4: Enter Secret Word
  const setEnterSecretWord = (enterSecretWord) => 
    dispatch({ type: "setEnterSecretWord", payload: enterSecretWord })
  // END: Challenge #4: Enter Secret Word

  // Challenge #5: Server Error
  const setServerError = (isServerError) => 
    dispatch({ type: "setEnterSecretWord", payload: isServerError })
  // END: Challenge #5: Server Error

  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord, setServerError) },
    []
  )

  if(!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          {/* Challenge #5: Server Error */}

            {/* Challenge #4: Enter Secret Word */}
            { state.enterSecretWord 
              ? <SecretWordEntry setEnterSecretWord={setEnterSecretWord} setSecretWord={setSecretWord} />
              : (<div>
                  <successContext.SuccessProvider>
                    {/* Challenge #3: Give Up */}
                    { state.givenUp 
                      ? <SecretWordReveal secretWord={state.secretWord}/>
                      : <Congrats /> }
                    {/* END: Challenge #3: Give Up */}

                    {/* Challenge #2 and #3 */}
                    <NewWordButton setSecretWord={setSecretWord} setGivenUp={setGivenUp} />
                    { !state.givenUp ? <GiveUpButton setGivenUp={setGivenUp}/> : "" }
                    <Input secretWord={state.secretWord} />
                    {/* END: Challenge #2 and #3 */}

                  </successContext.SuccessProvider>
                  <GuessedWords />
                  <EnterSecretWordButton setEnterSecretWord={setEnterSecretWord} />
                </div>)
                }
              {/* END: Challenge #4: Enter Secret Word */}
            {/* END: Challenge #5: Server Error */}
          </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
