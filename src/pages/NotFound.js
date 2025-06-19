import React from "react";
import Button from "../components/Button";
import notFoundPig from "../assets/not-found.png";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <div className="notfound-text">
          <h1>404 –</h1>
          <h2>Ups! Coś poszło nie tak.</h2>
          <p>
            Nie możemy znaleźć strony, której szukasz.
            <br />
            Może świnka ją zjadła?
          </p>
          <Button to="/" variant="primary">
            Wróć na stronę główną
          </Button>
        </div>
        <img
          src={notFoundPig}
          alt="Zagubiona świnka"
          className="notfound-image"
        />
      </div>
    </div>
  );
}

export default NotFound;
