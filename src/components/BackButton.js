import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // cofa o 1 stronę
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <IoIosArrowBack className="back-icon" />
      Wstecz
    </button>
  );
};

export default BackButton;
