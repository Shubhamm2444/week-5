a) Create an Error Dialog Component (errorDialog.js):

import React from 'react';

const ErrorDialog = ({ message, onClose }) => {
  return (
    <div className="error-dialog">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorDialog;

**This component takes two props:
message: The error message to display in the dialog.
onClose: A function to call when the user closes the dialog.
