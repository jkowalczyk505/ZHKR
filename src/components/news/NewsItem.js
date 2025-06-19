import React from "react";
import { Link } from "react-router-dom";

function NewsItem({ title, description, date, image, slug }) {
    return (
        <div className="news-item">
            <img src={image} alt={`Miniatura do: ${title}`} />
            <div className="news-item-right">
                <span className="news-item-date">{date}</span>
                <h3 className="news-item-title">
                    <Link to={`/aktualnosci/${slug}`}>{title}</Link>
                </h3>
                <p className="news-item-description">{description}</p>
            </div>
        </div>
    )
}

export default NewsItem;