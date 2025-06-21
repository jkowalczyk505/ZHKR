import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/breedings-banner.jpg";
import BreedingMap from "../components/breedings/BreedingMap";

function BreedingsPage() {
  return (
    <main className="page">
      <Banner
        image={bannerImage}
        title="Nasze hodowle"
        subtitle="Sprawdź listę oficjalnych, sprawdzonych hodowli zrzeszonych w naszym związku."
      />
      <section className="map dark-section">
        <div className="map-tile">
          <BreedingMap />
          <p>Na mapie obok możesz sprawdzić lokalizacje wszystkich oficjalnych i zarejestrowanych hodowli zrzeszonych w naszym związku. <br />
          Kliknij znacznik, aby poznać więcej szczegółów o danej hodowli.</p>
        </div>
      </section>
      <section className="all-breadings light-section">
        <h2 className="with-line all-breadings-h">Wszystkie hodowle</h2>
      </section>
    </main>
  );
}

export default BreedingsPage;
