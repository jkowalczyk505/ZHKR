import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logoInverted from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={logoInverted}
            alt="Związek Hodowców Kawii Rasowych – logo"
            className="footer-logo"
          />
          <span className="footer-tagline">
            <span>Związek&nbsp;Hodowców</span>
            <span>Kawii&nbsp;Rasowych</span>
          </span>
        </div>

        <address className="footer-contact">
          <strong>Kontakt</strong>
          <div className="contact-grid">
            <div className="contact-address">
              ul.&nbsp;Św.&nbsp;Kawii&nbsp;5<br />
              30-001&nbsp;Kraków
            </div>

            <div className="contact-links">
              tel.&nbsp;<a href="tel:+48123456789">12&nbsp;345&nbsp;67&nbsp;89</a><br />
              <a href="mailto:kontakt@zhkr.pl">kontakt@zhkr.pl</a>
            </div>
          </div>
        </address>

        <div className="footer-social">
          <ul className="social-links">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="icon" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 ZHKR. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}

export default Footer;
