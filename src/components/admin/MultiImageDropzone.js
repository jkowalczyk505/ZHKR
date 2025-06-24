import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../Spinner";

function MultiImageDropzone({
  label = "Zdjęcia",
  loading = false,
  previewUrls,
  setPreviewUrls,
  imageFiles,
  setImageFiles,
}) {
  const [loadingIndexes, setLoadingIndexes] = useState([]);

  // Hook zawsze wywoływany na początku
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newUrls = acceptedFiles.map((f) => URL.createObjectURL(f));
      const start = previewUrls.length;
      const newIdx = acceptedFiles.map((_, i) => start + i);

      setImageFiles((p) => [...p, ...acceptedFiles]);
      setPreviewUrls((p) => [...p, ...newUrls]);
      setLoadingIndexes((p) => [...p, ...newIdx]);
    },
    accept: { "image/*": [] },
    multiple: true,
    disabled: loading, // dropzone zablokowana podczas ładowania
  });

  const removeImage = (i) => {
    setPreviewUrls((p) => p.filter((_, idx) => idx !== i));
    setImageFiles((p) => p.filter((_, idx) => idx !== i));
    setLoadingIndexes((p) => p.filter((idx) => idx !== i));
  };

  const handleImageLoad = (i) => {
    setLoadingIndexes((p) => p.filter((idx) => idx !== i));
  };

  return (
    <div className="form-group image-group">
      <label>{label}</label>

      {loading ? (
        // Zawsze tu lądujesz, gdy loading === true
        <div
          className="dropzone-wrapper"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <Spinner />
        </div>
      ) : (
        // Ten fragment też nie wpływa na wywołanie hooka
        <div {...getRootProps()} className="dropzone-wrapper">
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? "Upuść zdjęcia tutaj..."
              : "Kliknij lub przeciągnij zdjęcia tutaj"}
          </p>
        </div>
      )}

      <div className="multi-image-preview">
        {previewUrls.map((url, i) => (
          <div
            key={i}
            className="image-preview"
            style={{ position: "relative" }}
          >
            {loadingIndexes.includes(i) && (
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
              alt={`Zdjęcie ${i}`}
              style={{
                maxWidth: "100%",
                borderRadius: "5px",
                display: loadingIndexes.includes(i) ? "none" : "block",
              }}
              onLoad={() => handleImageLoad(i)}
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImage(i)}
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
