import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/about-us-banner.jpg";

function AboutPage() {
  return (
    <div className="about-page page">
      <Banner
        image={bannerImage}
        title="O Związku"
        subtitle="Nasza działalność to więcej niż hodowla – to troska, wiedza i zaangażowanie"
      />
    </div>
  );
}

export default AboutPage;
