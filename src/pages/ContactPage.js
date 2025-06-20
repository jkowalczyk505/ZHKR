import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/contact-banner.jpg";

function ContactPage() {
  return (
    <div className="contact-page page">
      <Banner
        image={bannerImage}
        title="Skontaktuj się z nami"
        subtitle="Wszystkie dane znajdziesz poniżej"
      />
    </div>
  );
}

export default ContactPage;
