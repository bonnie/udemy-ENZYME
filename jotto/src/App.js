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

// Challenge #4: Enter Secret Word
import EnterWordButton from './EnterWordButton';
import EnterWordForm from './EnterWordForm';
// END: Challenge #4: Enter Secret Word

// Challenge #2: Reset Game
import ServerError from './ServerError';
// END: Challenge #2: Reset Game


import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';

// Challenge #2 and #4
import { 
  getSecretWord, 
  resetGame, 
  setUserSecretWord,
  setUserEntering } 
from './actions';
// END: Challenge #2 and #4

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
    // Challenge #4: Enter Secret Word
    let contents;
    // Challenge #5: Server Error
    if (this.props.serverError) {
      contents = <ServerError />
    // END: Challenge #5: Server Error
    } else if (this.props.userEnter === 'inProgress') {
      contents = (
        <EnterWordForm formAction={this.props.setUserSecretWord}/>
      );
    } else {
      contents = (
        <div>
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

          {/* Challenge #4: Enter Secret Word */}
          <EnterWordButton 
            display={this.props.guessedWords.length === 0}
            buttonAction={this.props.setUserEntering} 
          />
          {/* END: Challenge #4: Enter Secret Word */}
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Jotto</h1>
        { contents }
      </div>
    );
    // END: Challenge #4: Enter Secret Word
  }
}


// Challenge #4: Enter Secret Word
const mapStateToProps = ({ success, guessedWords, secretWord, gaveUp, userEnter, serverError }) => {
  return { success, guessedWords, secretWord, gaveUp, userEnter, serverError };
}
// END: Challenge #4: Enter Secret Word

// Challenge #2 and #4
const actions = { 
  getSecretWord, 
  resetGame, 
  setUserSecretWord,
  setUserEntering,
};

export default connect(mapStateToProps, actions)(UnconnectedApp);
// END: Challenge #2 and #4
