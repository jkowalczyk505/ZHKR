import React, { useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegCopy,
  FaTimes
} from "react-icons/fa";

export default function ModalContact({ isOpen, onClose, phone, email, name }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (val) => navigator.clipboard.writeText(val);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contact" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Zamknij">
          <FaTimes />
        </button>

        <h3>
          Kontakt z hodowlą:
          <br />
          <span>{name}</span>
        </h3>

        {phone && (
          <div className="contact-row">
            <FaPhoneAlt />
            <span>{phone}</span>
            <button onClick={() => copyToClipboard(phone)} title="Kopiuj">
              <FaRegCopy />
            </button>
          </div>
        )}

        {email && (
          <div className="contact-row">
            <FaEnvelope />
            <span>{email}</span>
            <button onClick={() => copyToClipboard(email)} title="Kopiuj">
              <FaRegCopy />
            </button>
          </div>
        )}

        <div className="modal-buttons">
          {phone && (
            <a href={`tel:${phone}`} className="modal-btn">
              Zadzwoń
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="modal-btn">
              Napisz e-mail
            </a>
          )}
        </div>
      </div>
    </div>
  );
}