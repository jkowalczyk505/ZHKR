import React from "react";
import pigHero from "../assets/pig-hero.png";
import Button from "../components/Button";
import NewsSection from "../components/news/NewsSection";

function HomePage() {

  return (
    <main className="page">
      <div className="content">
        <section className="hero">
          <div className="hero-left">
            <h1>
              Związek Hodowców <br />
              Kawii Rasowych
            </h1>
            <p>
              Aliqua reprehenderit mollit aliquip ea velit culpa nisi dolor sit
              aliquip elit. Cupidatat fugiat elit non reprehenderit minim
              laborum adipisicing elit ex eu incididunt nisi ad. Consequat
              commodo do incididunt velit. Nostrud occaecat nisi laborum laboris
              nostrud incididunt.
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
          <img src={pigHero} alt="Świnka morska"></img>
        </section>

        <NewsSection />

        <section className="breedings-container with-line">
          <h2>Nasze hodowle</h2>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
