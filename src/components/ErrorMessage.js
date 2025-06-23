// Error dla bledu wczytywania

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Button from "./Button";

function ErrorMessage({
  message = "Wystąpił błąd podczas ładowania danych.",
  onRetry,
}) {
  return (
    <div className="error-message">
      <FaExclamationTriangle className="icon" />
      <p>{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Spróbuj ponownie
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;
