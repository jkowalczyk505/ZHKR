import React, { useState, useRef, useEffect } from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/knowledge-banner.jpg";
import texel from "../assets/texel.png";
import Tile from "../components/Tile";
import { GiHighGrass, GiHealthNormal, GiBabyBottle } from "react-icons/gi";
import { FaPaw } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import useScrollReveal from "../hooks/useScrollReveal";
import { getGuideComponent } from "../components/guides";

function KnowledgePage() {
  useScrollReveal(".knowledge-heading", "slide-in-left");
  useScrollReveal(".knowledge-pig", "fade-in");
  useScrollReveal(".knowledge-details", "slide-in-up");
  const [selectedGuide, setSelectedGuide] = useState(null);
  const guideRef = useRef(null);

  useEffect(() => {
    if (selectedGuide && guideRef.current) {
      guideRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedGuide]);

  return (
    <main className="knowledge-page page">
      <Banner
        image={bannerImage}
        title="Wiedza"
        subtitle="Rasy kawii domowych, genetyka, poradniki"
      />
      <section className="characteristic light-section">
        <h2 className="characteristic-title with-line knowledge-heading">
          Charakterystyka gatunku
        </h2>
        <div className="container-with-two-sides">
          <img src={texel} alt="Texel" className="knowledge-pig"></img>
          <div className="subjects-right">
            <div className="subject-right">
              <h3 className="subject-title">Podstawowe informacje</h3>
              <p className="subject-content">
                Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation
                ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem
                eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla
                voluptate veniam. Pariatur sint exercitation nostrud nisi
                laboris eu labore et dolore incididunt. Non non eu nostrud
                tempor deserunt reprehenderit non consectetur officia duis sit
                ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam
                non mollit enim magna.
              </p>
            </div>
            <div className="subject-right">
              <h3 className="subject-title">Długość życia i wielkość</h3>
              <p className="subject-content">
                Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation
                ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem
                eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla
                voluptate veniam. Pariatur sint exercitation nostrud nisi
                laboris eu labore et dolore incididunt. Non non eu nostrud
                tempor deserunt reprehenderit non consectetur officia duis sit
                ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam
                non mollit enim magna.
              </p>
            </div>
            <div className="subject-right">
              <h3 className="subject-title">Tryb życia</h3>
              <p className="subject-content">
                Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation
                ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem
                eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla
                voluptate veniam. Pariatur sint exercitation nostrud nisi
                laboris eu labore et dolore incididunt. Non non eu nostrud
                tempor deserunt reprehenderit non consectetur officia duis sit
                ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam
                non mollit enim magna.
              </p>
            </div>
          </div>
        </div>
        <div className="subjects-below">
          <div className="subject-below">
            <h3 className="subject-title">Historia gatunku</h3>
            <p className="subject-content">
              Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad
              et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod
              non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate
              veniam. Pariatur sint exercitation nostrud nisi laboris eu labore
              et dolore incididunt. Non non eu nostrud tempor deserunt
              reprehenderit non consectetur officia duis sit ipsum amet. Eu
              fugiat eiusmod cillum laborum adipisicing veniam non mollit enim
              magna.
            </p>
          </div>
          <div className="subject-below">
            <h3 className="subject-title">Cechy i inteligencja</h3>
            <p className="subject-content">
              Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad
              et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod
              non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate
              veniam. Pariatur sint exercitation nostrud nisi laboris eu labore
              et dolore incididunt. Non non eu nostrud tempor deserunt
              reprehenderit non consectetur officia duis sit ipsum amet. Eu
              fugiat eiusmod cillum laborum adipisicing veniam non mollit enim
              magna.
            </p>
          </div>
          <div className="subject-below">
            <h3 className="subject-title">Typowe zachowania</h3>
            <p className="subject-content">
              Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad
              et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod
              non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate
              veniam. Pariatur sint exercitation nostrud nisi laboris eu labore
              et dolore incididunt. Non non eu nostrud tempor deserunt
              reprehenderit non consectetur officia duis sit ipsum amet. Eu
              fugiat eiusmod cillum laborum adipisicing veniam non mollit enim
              magna.
            </p>
          </div>
        </div>
      </section>
      <section className="guides dark-section">
        <h2 className="guides-title with-line knowledge-heading">Poradniki</h2>
        <div className="tiles-row tiles-row--two">
          <Tile
            title="Żywienie"
            icon={<GiHighGrass size={40} />}
            onClick={() => setSelectedGuide("Żywienie")}
            className="light-tile"
          />
          <Tile
            title="Wyposażenie"
            icon={<FaHouse size={40} />}
            onClick={() => setSelectedGuide("Wyposażenie")}
            className="light-tile"
          />
        </div>
        <div className="tiles-row tiles-row--three">
          <Tile
            title="Zdrowie"
            icon={<GiHealthNormal size={40} />}
            onClick={() => setSelectedGuide("Zdrowie")}
            className="light-tile"
          />
          <Tile
            title="Rozród"
            icon={<GiBabyBottle size={40} />}
            onClick={() => setSelectedGuide("Rozród")}
            className="light-tile"
          />
          <Tile
            title="Rasy"
            icon={<FaPaw size={40} />}
            onClick={() => setSelectedGuide("Rasy")}
            className="light-tile"
          />
        </div>
        <p className="tiles-info">Kliknij kafel, aby rozwinąć</p>
      </section>
      {selectedGuide && (
        <section
          className="guide-details light-section slide-in-up"
          ref={guideRef}
        >
          {getGuideComponent(selectedGuide)}
        </section>
      )}
    </main>
  );
}

export default KnowledgePage;
