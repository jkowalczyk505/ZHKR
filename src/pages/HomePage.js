import React, { useState, useEffect } from "react";
import axios from "axios";
import pigHero from "../assets/pig-hero.png";
import Button from "../components/Button";
import NewsItem from "../components/news/NewsItem";

const API_URL = process.env.REACT_APP_API_URL;

function HomePage() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts`);
        setNews(res.data);
      } catch (err) {
        console.error("Błąd podczas pobierania newsów:", err);
      }
    };

    fetchNews();
  }, []);

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

        <section className="news-container">
          <h2>Aktualności</h2>
          <div className="news">
            <div className="news">
              {news.map((item) => (
                <NewsItem
                  key={item.id}
                  title={item.tytul}
                  description={item.opis.slice(0, 200) + "..."}
                  date={
                    item.data_utworzenia
                      ? new Date(item.data_utworzenia).toLocaleDateString(
                          "pl-PL"
                        )
                      : "brak daty"
                  }
                  image={item.miniatura ? item.miniatura : pigHero}
                  slug={item.url}
                />
              ))}
            </div>
          </div>
          <div className="pagination">
            <Button variant="primary">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <span className="dots">...</span>
            <Button variant="outline">8</Button>
            <Button variant="outline">^</Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
