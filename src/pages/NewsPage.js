import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import ImageGallery from "../components/news/Gallery";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function NewsPage() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const fetchNews = useCallback(async () => {
    setError("");
    try {
      const postRes = await axios.get(`${API}/api/posts/${slug}`);
      const post = postRes.data;
      const imgsRes = await axios.get(`${API}/api/posts/${post.id}/images`);
      const imgs = imgsRes.data.images ?? [];
      setNews({ ...post, images: imgs });
    } catch (e) {
      console.error("Błąd ładowania posta lub zdjęć:", e);
      setError(
        "Nie udało się wczytać artykułu. Sprawdź połączenie i spróbuj ponownie."
      );
    }
  }, [API, slug]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Zawsze pokazujemy BackButton
  return (
    <main className="news-page page">
      <section className="news-container light-section">
        <BackButton />

        {error ? (
          <ErrorMessage message={error} onRetry={fetchNews} />
        ) : !news ? (
          <Spinner />
        ) : (
          <>
            <h1>{news.tytul}</h1>
            <p className="news-date">
              {news.data_utworzenia
                ? new Date(news.data_utworzenia).toLocaleDateString("pl-PL")
                : ""}
            </p>

            <div className="news-details">
              <div className="news-content">
                {news.opis
                  .split(/\r\n\r\n/)            // podział na akapity
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
              </div>

              {news.images.length > 0 && (
                <div className="news-gallery">
                  <ImageGallery
                    photos={news.images.map((i) => ({
                      src: `${API}${i.url}`,
                      width: Number(i.width),
                      height: Number(i.height),
                    }))}
                    items={news.images.map((i) => ({
                      src: `${API}${i.url}`,
                      width: Number(i.width),
                      height: Number(i.height),
                    }))}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default NewsPage;
