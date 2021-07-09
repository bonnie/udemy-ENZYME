import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

// Challenge #1: Number of Guesses
import TotalGuesses from "./TotalGuesses";
// END: Challenge #1: Number of Guesses

// Challenge #2: Reset Game
import NewWordButton from "./NewWordButton";
// END: Challenge #2: Reset Game

// Challenge #3: Give up
import SecretWordReveal from "./SecretWordReveal";
// END: Challenge #3: Give up

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

  // Challenge #3
  const gaveUp = useSelector((state) => state.gaveUp);
  // END: Challenge #3

  // Challenge #4
  const userEnter = useSelector((state) => state.userEnter);
  // END: Challenge #4

  // Challenge #5
  const serverError = useSelector((state) => state.serverError);
  // END: Challenge #5

  // so that we can dispatch an action
  const dispatch = useDispatch();

  useEffect(() => {
    // get the secret word
    dispatch(getSecretWord());
  }, []);

  // Challenge #4: Enter Secret Word
  let contents;
  // Challenge #5: Server Error
  if (serverError) {
    contents = <ServerError />;
    // END: Challenge #5: Server Error
  } else if (userEnter === "inProgress") {
    contents = (
      <EnterWordForm formAction={(word) => dispatch(setUserSecretWord(word))} />
    );
  } else {
    contents = (
      <div>
        <Congrats success={success} />

        {/* Challenge #3: Give Up Button */}
        <SecretWordReveal display={gaveUp} secretWord={secretWord} />
        {/* END: Challenge #3: Give Up Button */}

        {/* Challenge #2 and #3 */}
        <NewWordButton
          display={success || gaveUp}
          resetAction={() => dispatch(resetGame())}
        />
        {/* END: Challenge #2 and #3 */}

        <Input />
        <GuessedWords guessedWords={guessedWords} />

        {/* Challenge #1: Number of guesses */}
        <TotalGuesses guessCount={guessedWords.length} />
        {/* END: Challenge #1: Number of guesses */}

        {/* Challenge #4: Enter Secret Word */}
        <EnterWordButton
          display={guessedWords.length === 0}
          buttonAction={() => dispatch(setUserEntering())}
        />
        {/* END: Challenge #4: Enter Secret Word */}
      </div>
    );
  }
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      {contents}
    </div>
  );
  // END: Challenge #4: Enter Secret Word
}

export default App;
