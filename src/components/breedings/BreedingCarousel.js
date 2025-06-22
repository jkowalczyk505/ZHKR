import React, { useEffect, useState } from "react";
import axios from "axios";
import BreedingItem from "./BreedingItem";
import useScrollReveal from "../../hooks/useScrollReveal";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../Button";

import ModalContact from "./ModalContact";

export const PrevArrow = ({ className, onClick }) => (
  <div className={`${className} custom-arrow prev`} onClick={onClick}>
    <FaChevronLeft />
  </div>
);

export const NextArrow = ({ className, onClick }) => (
  <div className={`${className} custom-arrow next`} onClick={onClick}>
    <FaChevronRight />
  </div>
);

const API_URL = process.env.REACT_APP_API_URL;

function BreedingCarousel() {
  const [breedings, setBreedings] = useState([]);
  const [selectedBreeding, setSelectedBreeding] = useState(null);

  useScrollReveal(".breeding-heading", "slide-in-left");

  useEffect(() => {
    const fetchBreedings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hodowle`);
        setBreedings(res.data);
      } catch (err) {
        console.error("Błąd podczas pobierania hodowli:", err);
      }
    };

    fetchBreedings();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="breedings-container dark-section">
      <h2 className="with-line breeding-heading">Nasze hodowle</h2>
      <Slider {...settings} className="breeding-carousel">
        {breedings.map((b) => (
          <BreedingItem
            key={b.numer}
            name={b.nazwa}
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
            onContactClick={() =>
              setSelectedBreeding({
                phone: b.telefon,
                email: b.email,
                name: b.nazwa,
              })
            }
          />
        ))}
      </Slider>
      <div className="btn-all-breadings">
        <Button variant="primary" to="/hodowle">
          Pokaż wszystkie
        </Button>
      </div>
      {selectedBreeding && (
        <ModalContact
          isOpen={true}
          onClose={() => setSelectedBreeding(null)}
          phone={selectedBreeding.phone}
          email={selectedBreeding.email}
          name={selectedBreeding.name}
        />
      )}
    </section>
  );
}

export default BreedingCarousel;
