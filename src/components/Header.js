import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="logo"></img>
            
            <nav id="main-nav">
                <ul className="menu">
                    <li className="menu-item">
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Strona główna</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/hodowle" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Nasze hodowle</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/o-nas" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>O nas</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/kontakt" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Kontakt</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;