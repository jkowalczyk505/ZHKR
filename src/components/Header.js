import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" />
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav id="main-nav" className={menuOpen ? "open" : ""}>
        <ul className="menu" onClick={() => setMenuOpen(false)}>
          <li className="menu-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Strona główna
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/hodowle"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Hodowle
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/wiedza"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Wiedza
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/o-nas"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              O nas
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/kontakt"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Kontakt
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/pliki"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Pliki
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
