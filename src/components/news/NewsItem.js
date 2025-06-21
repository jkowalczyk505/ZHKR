import React from "react";
import { Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import Button from "../Button";

function NewsItem({ title, description, date, image, slug }) {
  const backendUrl = process.env.REACT_APP_API_URL;

  return (
    <div className="news-item">
      {image ? (
        <img
          src={`${backendUrl}/uploads/posts/${image}`}
          alt={`Miniatura do: ${title}`}
        />
      ) : (
        <div className="news-placeholder">
          <IoNewspaperOutline className="placeholder-icon" />
        </div>
      )}

      <div className="news-item-right">
        <div>
          <span className="news-item-date">{date}</span>
          <h3 className="news-item-title">
            <Link to={`/aktualnosci/${slug}`}>{title}</Link>
          </h3>
          <p className="news-item-description">{description}</p>
        </div>
        <div className="news-item-button">
          <Button variant="outline" to={`/aktualnosci/${slug}`}>
            Czytaj więcej
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
