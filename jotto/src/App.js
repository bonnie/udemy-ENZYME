import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

// Challenge #1: Number of Guesses
import TotalGuesses from './TotalGuesses';
// END: Challenge #1: Number of Guesses

// Challenge #2: Reset Game
import NewWordButton from './NewWordButton';
// END: Challenge #2: Reset Game

// Challenge #2: Reset Game
import SecretWordReveal from './SecretWordReveal';
// END: Challenge #2: Reset Game

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';

// Challenge #2: Reset Game
import { getSecretWord, resetGame } from './actions';
// END: Challenge #2: Reset Game

export class UnconnectedApp extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />

        {/* Challenge #3: Give Up Button */}
        <SecretWordReveal display={this.props.gaveUp} secretWord={this.props.secretWord} />
        {/* END: Challenge #3: Give Up Button */}

        {/* Challenge #2 and #3 */}
        <NewWordButton 
          display={this.props.success || this.props.gaveUp } 
          resetAction={this.props.resetGame} />
        {/* END: Challenge #2 and #3 */}


        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />

        {/* Challenge #1: Number of guesses */}
        <TotalGuesses guessCount={this.props.guessedWords.length} />
        {/* END: Challenge #1: Number of guesses */}
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord, gaveUp }) => {
  return { success, guessedWords, secretWord, gaveUp };
}

// Challenge #2: Reset Game
const actions = { getSecretWord, resetGame };

export default connect(mapStateToProps, actions)(UnconnectedApp);
// END: Challenge #2: Reset Game
