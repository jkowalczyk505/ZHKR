import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/breedings-banner.jpg";
import BreedingMap from "../components/breedings/BreedingMap";
import AllBreadingSection from "../components/breedings/AllBreadingsSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

function BreedingsPage() {
  const location = useLocation();
  useScrollReveal(".breedings-heading", "slide-in-left");

  useEffect(() => {
    if (location.state?.scrollToId) {
      // Delay scroll to wait for DOM
      const timeout = setTimeout(() => {
        const element = document.getElementById(location.state.scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // 100 ms opóźnienia, możesz dostosować

      return () => clearTimeout(timeout);
    }
  }, [location]);

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
          <p>
            Na mapie obok możesz sprawdzić lokalizacje wszystkich oficjalnych i
            zarejestrowanych hodowli zrzeszonych w naszym związku. <br />
            Kliknij znacznik, aby poznać więcej szczegółów o danej hodowli.
          </p>
        </div>
        <p className="copyright">
          Mapa wyświetlana przy użyciu{" "}
          <a href="https://leafletjs.com" target="_blank">
            Leaflet
          </a>
          . Dane mapowe ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank">
            OpenStreetMap współtwórcy
          </a>
          . Geokodowanie lokalizacji zapewnia{" "}
          <a href="https://nominatim.org" target="_blank">
            Nominatim
          </a>
          .
        </p>
      </section>
      <AllBreadingSection />
      <section
        id="register-your-breeding"
        className="register-your-breeding dark-section"
      >
        <h2 className="with-line register-heading breedings-heading">
          Chcesz do nas dołączyć?
        </h2>
      </section>
    </main>
  );
}

export default BreedingsPage;
