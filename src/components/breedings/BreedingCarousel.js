import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

function BreedingCarousel() {
  useScrollReveal(".breeding-heading", "slide-in-left");

  return (
    <section className="breedings-container dark-section">
      <h2 className="with-line breeding-heading">Nasze hodowle</h2>
    </section>
  );
}

export default BreedingCarousel;
