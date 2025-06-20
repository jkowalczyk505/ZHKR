import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/breedings-banner.jpg";

function BreedingsPage() {
  return (
    <div className="breedings-page page">
      <Banner
        image={bannerImage}
        title="Nasze hodowle"
        subtitle="Sprawdź listę oficjalnych, sprawdzonych hodowli zrzeszonych w naszym związku."
      />
    </div>
  );
}

export default BreedingsPage;
