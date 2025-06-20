import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/knowledge-banner.jpg";

function KnowledgePage() {
  return (
    <div className="knowledge-page page">
      <Banner
        image={bannerImage}
        title="Wiedza"
        subtitle="Rasy kawii domowych, genetyka, poradniki"
      />
    </div>
  );
}

export default KnowledgePage;
