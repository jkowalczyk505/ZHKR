import React, { useEffect, useState } from "react";
import axios from "axios";
import BreedingTile from "./BreedingTile";
import useScrollReveal from "../../hooks/useScrollReveal";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

const API_URL = process.env.REACT_APP_API_URL;

function AllBreadingSection() {
  const [breedings, setBreedings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useScrollReveal(".breedings-heading", "slide-in-left");

  const fetchBreedings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/hodowle`);
      const sorted = res.data.sort((a, b) =>
        a.nazwa.localeCompare(b.nazwa, "pl", { sensitivity: "base" })
      );
      setBreedings(sorted);
      setError(null);
    } catch (err) {
      console.error("Błąd pobierania hodowli:", err);
      setError("Nie udało się załadować hodowli. Spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBreedings();
  }, []);

  return (
    <section className="all-breadings light-section">
      <h2 className="with-line all-breadings-h breedings-heading">
        Wszystkie hodowle
      </h2>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchBreedings} />
      ) : (
        <div className="breeding-tile-list">
          {breedings.length > 0 ? (
            breedings.map((b) => (
              <BreedingTile
                key={b.numer}
                name={b.nazwa}
                number={b.numer}
                image={b.zdjecie}
                city={b.miejscowosc}
                province={b.wojewodztwo}
                owner={b.wlasciciel}
                breeds={b.rasy}
                phone={b.telefon}
                email={b.email}
                fb={b.fb}
                ig={b.ig}
                www={b.www}
              />
            ))
          ) : (
            <ErrorMessage message="Brak dostępnych hodowli." />
          )}
        </div>
      )}
    </section>
  );
}

export default AllBreadingSection;
