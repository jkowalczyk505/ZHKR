import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";

function NewsPage() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const backendUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/posts/${slug}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.error("Błąd ładowania aktualności:", err));
  }, [slug]);


  if (!news) {
    return (
      <main className="news-page page">
        <section className="news-container light-section">
          <p>Ładowanie aktualności...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="news-page page">
      <section className="news-container light-section">
        <BackButton />
        <h1>{news.tytul}</h1>
        <p className="news-date">
            {news.data_utworzenia
                ? new Date(news.data_utworzenia).toLocaleDateString("pl-PL")
                : ""}
        </p>
        <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: news.opis }}
        />
      </section>
    </main>
  );
}

export default NewsPage;
