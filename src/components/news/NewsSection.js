import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import Pagination from "./Pagination";
import useScrollReveal from "../../hooks/useScrollReveal";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner"; // dodaj spinner

const API_URL = process.env.REACT_APP_API_URL;
const POSTS_PER_PAGE = 4;

function NewsSection() {
  useScrollReveal(".news-heading", "slide-in-left");
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ← nowy stan

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/posts`, {
        withCredentials: true,
      });
      const sorted = res.data.sort(
        (a, b) => new Date(b.data_utworzenia) - new Date(a.data_utworzenia)
      );
      setNews(sorted);
      setError(null);
    } catch (err) {
      console.error("Błąd podczas pobierania newsów:", err);
      setError(
        "Nie udało się załadować aktualności. Spróbuj ponownie później."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visibleNews = news.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="news-container light-section">
      <h2 className="with-line news-heading">Aktualności</h2>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchNews} />
      ) : (
        <>
          <div className="news-grid">
            {visibleNews.map((item) => {
              const MAX = 120;
              const shortDescription =
                item.opis.length > MAX
                  ? item.opis.slice(0, MAX) + "..."
                  : item.opis;

              return (
                <NewsItem
                  key={item.id}
                  title={item.tytul}
                  description={shortDescription}
                  date={
                    item.data_utworzenia
                      ? new Date(item.data_utworzenia).toLocaleDateString(
                          "pl-PL"
                        )
                      : "brak daty"
                  }
                  image={item.miniatura}
                  slug={item.url}
                />
              );
            })}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}

export default NewsSection;
