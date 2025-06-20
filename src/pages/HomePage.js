import React from "react";
import pigHero from "../assets/pig-hero.png";
import Button from "../components/Button";
import NewsSection from "../components/news/NewsSection";
import BreedingCarousel from "../components/breedings/BreedingCarousel";
import BreedingItem from "../components/breedings/BreedingItem";

function HomePage() {
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
    </main>
  );
}

export default HomePage;
