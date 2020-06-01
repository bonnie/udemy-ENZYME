// Challenge #3: Give Up
import React from "react";
import PropTypes from "prop-types";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";

/**
 * Functional react component for revealed secret word
 *    (for use after the player has given up)
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component with secret word
 */
export default function SecretWordReveal({ secretWord }) {
  const language = React.useContext(languageContext);

  return (
    <div data-test="component-secret-word-reveal" className="alert alert-danger">
      <p>{stringsModule.getStringByLanguage(language, "secretWordWas")} "{secretWord}"</p>
      <p>{stringsModule.getStringByLanguage(language, "betterLuck")}</p>
    </div>
  )
}

SecretWordReveal.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

// END: Challenge #3: Give Up
