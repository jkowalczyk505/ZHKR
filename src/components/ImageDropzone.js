// pole na dodawanie, edycje, usuwanie zdjec
import React from "react";
import { useDropzone } from "react-dropzone";
import "./ImageDropzone.scss";

function ImageDropzone({
  previewUrl,
  setPreviewUrl,
  setImageFile,
  setRemoveImage,
}) {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="form-group image-group">
      <label>Zdjęcie hodowli</label>

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
        <div className="image-preview">
          <img
            src={previewUrl}
            alt="Podgląd zdjęcia"
            style={{ maxWidth: "100%", borderRadius: "5px" }}
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
