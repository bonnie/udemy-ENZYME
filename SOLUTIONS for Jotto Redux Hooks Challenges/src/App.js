import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

// Challenge #1: Number of Guesses
import TotalGuesses from "./TotalGuesses";
// END: Challenge #1: Number of Guesses

// Challenge #2: Reset Game
import NewWordButton from "./NewWordButton";
// END: Challenge #2: Reset Game

// Challenge #2: Reset Game
import SecretWordReveal from "./SecretWordReveal";
// END: Challenge #2: Reset Game

// Challenge #4: Enter Secret Word
import EnterWordButton from "./EnterWordButton";
import EnterWordForm from "./EnterWordForm";
// END: Challenge #4: Enter Secret Word

// Challenge #2: Reset Game
import ServerError from "./ServerError";
// END: Challenge #2: Reset Game

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

import {
  getSecretWord,
  // Challenge #2
  resetGame,
  // END: Challenge #2

  // Challenge #4
  setUserSecretWord,
  setUserEntering,
  // END: Challenge #2
} from "./actions";

function App() {
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);
  const secretWord = useSelector((state) => state.secretWord);

  // Challenge #2
  const gaveUp = useSelector((state) => state.gaveUp);
  // END: Challenge #2

  // so that we can dispatch an action
  const dispatch = useDispatch();

  useEffect(() => {
    // get the secret word
    dispatch(getSecretWord());
  }, []);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>

      {/* Challenge #2 and #3 */}
      <NewWordButton display={success || gaveUp} resetAction={resetGame} />
      {/* END: Challenge #2 and #3 */}

      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
