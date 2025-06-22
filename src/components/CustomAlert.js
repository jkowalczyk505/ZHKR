import React from "react";
import Button from "./Button"; // Upewnij się, że ścieżka jest poprawna

function CustomAlert({
  message,
  onClose,
  onConfirm,
  confirmButtonText = "OK",
  cancelButtonText = null,
}) {
  return (
    <div className="custom-alert-backdrop">
      <div className="custom-alert-box">
        <p>{message}</p>
        <div className="custom-alert-buttons">
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              {confirmButtonText}
            </Button>
          )}
          {cancelButtonText && (
            <Button variant="outline" onClick={onClose}>
              {cancelButtonText}
            </Button>
          )}
          {!cancelButtonText && !onConfirm && (
            <Button variant="primary" onClick={onClose}>
              {confirmButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
