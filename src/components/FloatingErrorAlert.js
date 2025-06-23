// components/FloatingErrorAlert.js
import React from "react";

function FloatingErrorAlert({ message }) {
  if (!message) return null;

  return <div className="floating-error">{message}</div>;
}

export default FloatingErrorAlert;
