// Challenge #3: Give Up
import React from "react";
import PropTypes from "prop-types";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";

/**
 * Functional react component for reset button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` context is false).
 */
export default function GiveUpButton({ setGivenUp }) {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();

  if (success) {
    return <div data-test="component-give-up-button" />
  }
  return (
    <button 
      data-test="component-give-up-button"
      className="btn btn-danger mb-2"
      onClick={() => {setGivenUp(true); setSuccess(true)}}
    >
      {stringsModule.getStringByLanguage(language, "giveUp")}
    </button>
  )
}

GiveUpButton.propTypes = {
  setGivenUp: PropTypes.func.isRequired,
}

// END: Challenge #3: Give Up