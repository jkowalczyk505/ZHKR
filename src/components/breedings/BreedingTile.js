import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { IoImageOutline } from "react-icons/io5";

function BreedingTile({
  name,
  number,
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
}) {
  const backendUrl = process.env.REACT_APP_API_URL;

  return (
    <div className="breeding-tile">
      <div className="breeding-tile-image">
        {image ? (
          <img src={`${backendUrl}/${image}`} alt={name} />
        ) : (
          <div className="breeding-tile-placeholder">
            <IoImageOutline className="placeholder-icon" />
          </div>
        )}
      </div>
      <div className="breeding-tile-content">
        <div className="breeding-tile-information">
          <h3 className="breeding-tile-name">{name}</h3>
          <p>
            <em>Właściciel:</em> {owner}
          </p>
          <p>
            <em>Numer hodowli:</em> {number}
          </p>
          <p>
            <em>Rasy:</em> {breeds}
          </p>
          <p>
            <em>Miejscowość:</em> {city}
          </p>
          <p>
            <em>Województwo:</em> {province}
          </p>
        </div>

        <div className="breeding-tile-icons">
          {phone && <FaPhoneAlt />}
          {email && <FaEnvelope />}
          {fb && <FaFacebookF />}
          {ig && <FaInstagram />}
          {www && <TbWorldWww />}
        </div>
      </div>
    </div>
  );
}

export default BreedingTile;
