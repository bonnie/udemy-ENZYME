// Challenge #5: Server Error
import React from "react";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";

/**
 * Functional react component for revealed secret word
 *    (for use after the player has given up)
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component with secret word
 */
export default function ServerError(props) {
  const language = React.useContext(languageContext);

  return (
    <div data-test="component-server-error" className="alert alert-danger">
      {stringsModule.getStringByLanguage(language, "serverError")}
    </div>
  )
}

// Challenge #5: Server Error
