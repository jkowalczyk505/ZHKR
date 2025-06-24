import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logoInverted from "../assets/logo.png";
import { NavLink } from "react-router-dom";

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
              Jaroszewy 8A
              <br />
              83-236 Jaroszewy
            </div>

            <div className="contact-links">
              tel.&nbsp;
              <a href="tel:+48123456789">12&nbsp;345&nbsp;67&nbsp;89</a>
              <br />
              <a href="mailto:kontakt@zhkr.pl">kontakt@example.com</a>
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
      <NavLink to="/admin">Admin</NavLink>
    </footer>
  );
}

export default Footer;
