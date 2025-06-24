import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../Spinner";

function ImageDropzone({
  label = "Zdjęcie",
  previewUrl,
  setPreviewUrl,
  setImageFile,
  setRemoveImage,
}) {
  // 🔹 stan ładowania podglądu
  const [isImgLoading, setIsImgLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRemoveImage(false);
      setIsImgLoading(true); // 🔹 uruchamiamy spinner
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // 🔹 gdy zmieni się URL podglądu, też włącz spinner
  useEffect(() => {
    if (previewUrl) {
      setIsImgLoading(true);
    }
  }, [previewUrl]);

  return (
    <div className="form-group image-group">
      <label>{label}</label>

      {!previewUrl ? (
        <div {...getRootProps()} className="dropzone-wrapper">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Upuść zdjęcie tutaj...</p>
          ) : (
            <p>Kliknij lub przeciągnij zdjęcie tutaj</p>
          )}
        </div>
      ) : (
        <div className="image-preview" style={{ position: "relative" }}>
          {/* 🔹 Spinner nakładany na obraz */}
          {isImgLoading && (
            <div
              className="preview-spinner"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.7)",
                zIndex: 1,
              }}
            >
              <Spinner />
            </div>
          )}
          <img
            src={previewUrl}
            alt="Podgląd zdjęcia"
            style={{
              maxWidth: "100%",
              borderRadius: "5px",
              display: isImgLoading ? "none" : "block", // ukrywamy aż załaduje
            }}
            onLoad={() => setIsImgLoading(false)} // 🔹 wyłączamy spinner
          />
          <button
            type="button"
            className="remove-image-btn"
            onClick={() => {
              setPreviewUrl("");
              setImageFile(null);
              setRemoveImage(true);
            }}
            aria-label="Usuń zdjęcie"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageDropzone;
