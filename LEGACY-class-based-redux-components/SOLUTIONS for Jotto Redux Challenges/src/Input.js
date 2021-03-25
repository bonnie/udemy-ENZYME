import React, { Component } from 'react';
import { connect } from 'react-redux';

// Challenge #3: Give Up Button
import { guessWord, giveUp } from './actions';
// END: Challenge #3: Give Up Button

export class UnconnectedInput extends Component {
  /**
   * @method constructor
   * @param {object} props - Component props.
   * @returns {undefined}
   */
  constructor(props) {
    super(props);

    this.inputBox = React.createRef();
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
    this.giveUpOnClick = this.giveUpOnClick.bind(this);
  }
  /**
   * Run `guessWord` action on the submitted word (if it's not empty)
   * @method submitGuessedWord
   * @param {Event} evt - Event that triggered the call.
   * @returns {undefined}
   */
  submitGuessedWord(evt) {
    evt.preventDefault();

    const guessedWord = this.inputBox.current.value;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }

    this.inputBox.current.value = '';
  }

  giveUpOnClick(evt) {
    evt.preventDefault(); 
    this.props.giveUp();
  }

  render() {
    const contents = this.props.success || this.props.gaveUp
      ? null
      : (
        <form className="form-inline">
          <input
            data-test="input-box"
            ref={this.inputBox}
            className="mb-2 mx-sm-3"
            id="word-guess"
            type="text"
            placeholer="enter guess" />
          <button
            data-test="submit-button"
            onClick={this.submitGuessedWord}
            className="btn btn-primary mb-2"
            type="submit">
            Submit
          </button>
          {/* Challenge #3: Give Up Button */}
          <button 
            data-test="give-up-button"
            onClick={this.giveUpOnClick}
            className="btn btn-danger mb-2">
            Give up
          </button>
          {/* END: Challenge #3: Give Up Button */}
        </form>
      );
    return (
      <div data-test="component-input">
        { contents }
      </div>
    )
  }
};

const mapStateToProps = ({ success, gaveUp }) => {
  return { success, gaveUp };
}

// Challenge #3: Give Up Button
export default connect(mapStateToProps, { guessWord, giveUp })(UnconnectedInput);
// END: Challenge #3: Give Up Button
