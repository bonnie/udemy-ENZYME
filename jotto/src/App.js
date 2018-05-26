import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

// Challenge #1: Number of Guesses
import TotalGuesses from './TotalGuesses';
// END: Challenge #1: Number of Guesses

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import { getSecretWord } from './actions';

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
    console.log(this.props.secretWord);
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        {/* Challenge #1: Number of guesses */}
        <TotalGuesses guessCount={this.props.guessedWords.length} />
        {/* END: Challenge #1: Number of guesses */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
}

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
