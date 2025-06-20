import React from "react";
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

function BreedingItem({ name, image, address, owner, breeds, phone, email, fb, ig }) {
  return (
    <div className="breeding-item">
      <div className="breeding-image">
        {image ? (
            <img src={image} alt={name} />
        ) : (
            <div className="breeding-placeholder">
            <IoImageOutline className="placeholder-icon" />
            </div>
        )}
        <h3 className="breeding-name">{name}</h3>
      </div>
      <div className="breeding-info">
        <p>{address}</p>
        <p>{owner}</p>
        <p>Rasy: {breeds}</p>
        <div className="breeding-icons">
          {phone && <FaPhoneAlt title="Telefon" />}
          {email && <FaEnvelope title="Email" />}
          {fb && <FaFacebookF title="Facebook" />}
          {ig && <FaInstagram title="Instagram" />}
        </div>
      </div>
    </div>
  );
}

export default BreedingItem;
