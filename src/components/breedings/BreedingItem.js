import React, {useState} from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { IoImageOutline } from "react-icons/io5";

function BreedingItem({
  name,
  image,
  city,
  province,
  owner,
  breeds,
  phone,
  email,
  fb,
  ig,
  www,
  admin,
  onContactClick 
}) {
  const backendUrl = process.env.REACT_APP_API_URL;

  return (
    <div className="breeding-item">
      <div className="breeding-image">
        {image ? (
          <img src={`${backendUrl}${image}`} alt={name} />
        ) : (
          <div className="breeding-placeholder">
            <IoImageOutline className="placeholder-icon" />
          </div>
        )}
        <h3 className="breeding-name">{name}</h3>
      </div>

      <div className="breeding-info">
        <div className="info-text">
          <p>
            <em>Właściciel: </em>
            {owner}
          </p>
          <p>
            <em>Rasy: </em>
            {breeds}
          </p>
          <p>
            <em>Miasto: </em>
            {city}
          </p>
          <p>
            <em>Województwo: </em>
            {province}
          </p>
        </div>
        <div className="breeding-icons">
          {phone && (
            <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>
              <FaPhoneAlt />
            </a>
          )}
          {email && (
            <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>
              <FaEnvelope />
            </a>
          )}
          {fb && (
            <a href={fb} target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
          )}
          {ig && (
            <a href={ig} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          )}
          {www && (
            <a href={www} target="_blank" rel="noopener noreferrer">
              <TbWorldWww />
            </a>
          )}
        </div>
      </div>
      {admin && (
        <div className="breeding-actions">
          <button className="btn edit">Edytuj</button>
          <button className="btn delete">Usuń</button>
        </div>
      )}
    </div>
  );
}

export default BreedingItem;
