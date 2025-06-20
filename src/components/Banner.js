import React from "react";

function Banner({ image, title, subtitle }) {
  return (
    <div className="banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="banner-overlay" />
      <div className="banner-content fade-in">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

export default Banner;
