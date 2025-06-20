import React from "react";
import pigHero from "../assets/pig-hero.png";
import Button from "../components/Button";
import NewsSection from "../components/news/NewsSection";
import BreedingCarousel from "../components/breedings/BreedingCarousel";
import { FaClipboardList, FaBookOpen } from "react-icons/fa";
import useScrollReveal from "../hooks/useScrollReveal";

function HomePage() {
  useScrollReveal(".register-box", "slide-in-right");
  useScrollReveal(".knowledge-box", "slide-in-left");

  return (
    <main className="page">
      <section className="hero dark-section">
        <div className="hero-left slide-in-left">
          <h1>
            Związek Hodowców <br />
            Kawii Rasowych
          </h1>
          <p>
            Aliqua reprehenderit mollit aliquip ea velit culpa nisi dolor sit
            aliquip elit. Cupidatat fugiat elit non reprehenderit minim laborum
            adipisicing elit ex eu incididunt nisi ad. Consequat commodo do
            incididunt velit. Nostrud occaecat nisi laborum laboris nostrud
            incididunt.
          </p>
          <div className="buttons">
            <Button variant="primary" to="/o-nas">
              Dowiedz się więcej
            </Button>
            <Button variant="outline" to="/kontakt">
              Kontakt
            </Button>
          </div>
        </div>
        <img src={pigHero} alt="Świnka morska" className="slide-in-right"></img>
      </section>

      <NewsSection />

      <BreedingCarousel />

      <section className="register-section light-section">
        <div className="register-box">
          <div className="icon">
            <FaClipboardList />
          </div>
          <div className="text">
            <h2 className="with-line">Zarejestruj swoją hodowlę</h2>
            <p>
              Sprawdź jak krok po kroku zarejestrować hodowlę w naszym związku.
            </p>
            <Button variant="primary" to="/jak-zarejestrowac-hodowle">
              Zobacz szczegóły
            </Button>
          </div>
        </div>
      </section>

      <section className="knowledge-section dark-section">
        <div className="knowledge-box">
          <div className="text">
            <h2 className="with-line">Wiedza i poradniki</h2>
            <p>
              Poznaj rasy kawii oraz poradniki dotyczące najczęstszych
              problemów.
            </p>
            <Button variant="outline" to="/wiedza">
              Przejdź do wiedzy
            </Button>
          </div>
          <div className="icon">
            <FaBookOpen />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
