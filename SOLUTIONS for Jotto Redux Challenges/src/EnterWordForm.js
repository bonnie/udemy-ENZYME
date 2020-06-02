// Challenge #4: Enter Secret Word
import React from 'react';
import PropTypes from 'prop-types';

export class EnterWordForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(evt) {
    evt.preventDefault();
    // don't submit empty word
    if (this.inputBox.current.value.length > 0) {
      this.props.formAction(this.inputBox.current.value);
    }
  }
  render() {
    return (
      <div data-test="component-enter-word-form">
        <p data-test="enter-word-instructions">
          Enter a secret word for someone else to guess!
        </p>
        <form className="form-inline">
            <input
              data-test="enter-word-input"
              ref={this.inputBox}
              className="mb-2 mx-sm-3"
              type="text"
              placeholder="enter secret word" />
            <button
              data-test="submit-button"
              onClick={this.submitForm}
              className="btn btn-primary mb-2"
              type="submit">
              Submit
            </button>
          </form>
      </div>
    );
  }
}

EnterWordForm.propTypes = {
  formAction: PropTypes.func,
}

export default EnterWordForm;
// END: Challenge #4: Enter Secret Word
