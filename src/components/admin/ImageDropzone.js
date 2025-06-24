import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../Spinner";

function MultiImageDropzone({
  label = "Zdjęcia",
  previewUrls = [],
  setPreviewUrls,
  imageFiles = [],
  setImageFiles,
}) {
  const [loadingIndexes, setLoadingIndexes] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...acceptedFiles]);

    // Spinner dla nowych zdjęć
    const newIndexes = Array.from(
      { length: acceptedFiles.length },
      (_, i) => previewUrls.length + i
    );
    setLoadingIndexes((prev) => [...prev, ...newIndexes]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  useEffect(() => {
    if (previewUrls.length === 0) {
      setLoadingIndexes([]);
    }
  }, [previewUrls]);

  const handleRemove = (index) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setLoadingIndexes((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="form-group image-group">
      <label>{label}</label>
      <div {...getRootProps()} className="dropzone-wrapper">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Upuść zdjęcia tutaj...</p>
        ) : (
          <p>Kliknij lub przeciągnij zdjęcia tutaj</p>
        )}
      </div>

      <div className="image-preview-multi">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="image-preview"
            style={{ position: "relative" }}
          >
            {loadingIndexes.includes(index) && (
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
              src={url}
              alt={`Preview ${index}`}
              style={{
                maxWidth: "100%",
                borderRadius: "5px",
                display: loadingIndexes.includes(index) ? "none" : "block",
              }}
              onLoad={() =>
                setLoadingIndexes((prev) => prev.filter((i) => i !== index))
              }
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => handleRemove(index)}
              aria-label="Usuń zdjęcie"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiImageDropzone;
