import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../Spinner";

function MultiImageDropzone({
  label = "Zdjęcia",
  previewUrls,
  setPreviewUrls,
  imageFiles,
  setImageFiles,
  deletedImages,
  setDeletedImages,
}) {
  const [loadingIndexes, setLoadingIndexes] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newUrls = acceptedFiles.map((f) => URL.createObjectURL(f));
    const start = previewUrls.length;
    const newIdx = acceptedFiles.map((_, i) => start + i);

    setImageFiles((p) => [...p, ...acceptedFiles]);
    setPreviewUrls((p) => [...p, ...newUrls]);
    setLoadingIndexes((p) => [...p, ...newIdx]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (i) => {
    // jeśli to lokalny plik jeszcze nie wysłany
    if (imageFiles[i]) {
      setImageFiles((p) => p.filter((_, idx) => idx !== i));
    } else {
      // istniejący z serwera → zaznacz do usunięcia
      const fileName = previewUrls[i].split("/").pop();
      setDeletedImages((p) => [...p, fileName]);
    }
    setPreviewUrls((p) => p.filter((_, idx) => idx !== i));
    setLoadingIndexes((p) => p.filter((idx) => idx !== i));
  };

  const handleImageLoad = (i) => {
    setLoadingIndexes((p) => p.filter((idx) => idx !== i));
  };

  return (
    <div className="form-group image-group">
      <label>{label}</label>
      <div {...getRootProps()} className="dropzone-wrapper">
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Upuść zdjęcia..."
            : "Kliknij lub przeciągnij zdjęcia"}
        </p>
      </div>
      <div className="multi-image-preview">
        {previewUrls.map((url, i) => (
          <div
            key={i}
            className="image-preview"
            style={{ position: "relative" }}
          >
            {loadingIndexes.includes(i) && (
              <div className="preview-spinner">
                <Spinner />
              </div>
            )}
            <img
              src={url}
              alt={`Zdjęcie ${i}`}
              onLoad={() => handleImageLoad(i)}
              style={{ display: loadingIndexes.includes(i) ? "none" : "block" }}
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImage(i)}
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
