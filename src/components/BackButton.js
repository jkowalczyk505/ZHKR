import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <IoIosArrowBack className="back-icon" />
      <span className="back-text">Wstecz</span>
    </button>
  );
};

export default BackButton;
