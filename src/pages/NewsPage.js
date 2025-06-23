import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import ImageGallery from "../components/news/Gallery";
import Spinner from "../components/Spinner";

function NewsPage() {
  const { slug }         = useParams();
  const [news, setNews]   = useState(null);
  const API               = process.env.REACT_APP_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const post = (await axios.get(`${API}/api/posts/${slug}`)).data;
        const imgs = (await axios.get(`${API}/api/posts/${post.id}/images`)).data.images ?? [];

        setNews({ ...post, images: imgs });
      } catch (e) {
        console.error("Błąd ładowania posta lub zdjęć:", e);
      }
    })();
  }, [slug, API]);

  if (!news) {
    return (
      <main className="news-page page">
        <section className="news-container light-section">
          <Spinner />
        </section>
      </main>
    );
  }

  const items = news.images
    .filter((i) => i.url && i.width && i.height)
    .map((i) => ({
      src: `${API}${i.url}`,           // oryginalny obraz
      width: Number(i.width),         // z bazy – prawdziwe wymiary
      height: Number(i.height),
    }));

  const photos = items.map((p) => ({ ...p })); // kopia do gallery

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

        <div className="news-details">
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: news.opis }}
          />

          {photos.length > 0 && (
            <div className="news-gallery">
              <ImageGallery photos={photos} items={items} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default NewsPage;
