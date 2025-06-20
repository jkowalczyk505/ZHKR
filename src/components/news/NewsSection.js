import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import Pagination from "./Pagination";

const API_URL = process.env.REACT_APP_API_URL;
const POSTS_PER_PAGE = 4;

function NewsSection() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts`);
        const sorted = res.data.sort(
          (a, b) => new Date(b.data_utworzenia) - new Date(a.data_utworzenia)
        );
        setNews(sorted);
      } catch (err) {
        console.error("Błąd podczas pobierania newsów:", err);
      }
    };

    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visibleNews = news.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="news-container light-section">
      <h2 className="with-line">Aktualności</h2>
      <div className="news-grid">
        {visibleNews.map((item) => {
          const MAX = 120;
          const shortDescription =
            item.opis.length > MAX ? item.opis.slice(0, MAX) + "..." : item.opis;

          return (
            <NewsItem
              key={item.id}
              title={item.tytul}
              description={shortDescription}
              date={
                item.data_utworzenia
                  ? new Date(item.data_utworzenia).toLocaleDateString("pl-PL")
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
    </section>
  );
}

export default NewsSection;
