import React from "react";
import { Link } from "react-router-dom";

function Button({ children, variant = "primary", onClick, to }) {
  const className = `btn ${variant}`;

  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
