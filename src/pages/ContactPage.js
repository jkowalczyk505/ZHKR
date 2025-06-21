import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/contact-banner.jpg";
import ContactForm from "../components/ContactForm";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import greenPiggy from "../assets/greenPiggy.png";

function ContactPage() {
  return (
    <main className="page">
      <Banner
        image={bannerImage}
        title="Skontaktuj się z nami"
        subtitle="Wszystkie dane znajdziesz poniżej"
      />
      <section className="contact-section light-section">
        <div className="contact-tile">
          <h2 className="contact-title">Kontakt</h2>

          <div className="contact-container">
            <div className="left-contact">
              <h3>Dane kontaktowe</h3>
              <ul>
                <li>
                  <FaPhoneAlt /> <span>+48 123 456 789</span>
                </li>
                <li>
                  <FaEnvelope /> <span>kontakt@example.com</span>
                </li>
                <li>
                  <FaMapMarkerAlt />{" "}
                  <span>ul. Przykładowa 123<br />00-001 Warszawa</span>
                </li>
              </ul>
              <div className="green-pig">
                <img src={greenPiggy} alt="Zielona świnka"></img>
              </div>
            </div>
            <div className="right-contact">
              <h3>Formularz kontaktowy</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section> 
    </main>
  );
}

export default ContactPage;
