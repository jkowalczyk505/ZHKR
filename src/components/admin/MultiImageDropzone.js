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
  const [loadingIdx, setLoadingIdx] = useState([]);

  /* ========== drag & drop ========== */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (accepted) => {
      const tmpUrls = accepted.map((f) => URL.createObjectURL(f));
      setPreviewUrls((p) => [...p, ...tmpUrls]);
      setImageFiles((p) => [...p, ...accepted]);

      /* spinner dla nowych */
      const start = previewUrls.length;
      setLoadingIdx((p) => [...p, ...accepted.map((_, i) => start + i)]);
    },
  });

  /* ========== pojedyncze usunięcie ========== */
  const removeImage = (idx) => {
    /*  nowo dodany plik – tylko lokalnie  */
    if (imageFiles[idx]) {
      setImageFiles((p) => p.filter((_, i) => i !== idx));
    } else {
      /*  plik istnieje na serwerze  */
      const name = previewUrls[idx].split("/").pop();
      setDeletedImages((p) => [...p, name]);
    }
    setPreviewUrls((p) => p.filter((_, i) => i !== idx));
    setImageFiles((p) => p.filter((_, i) => i !== idx));
    setLoadingIdx((p) => p.filter((i) => i !== idx));
  };

  return (
    <div className="form-group image-group">
      <label>{label}</label>

      <div {...getRootProps()} className="dropzone-wrapper">
        <input {...getInputProps()} />
        <p>
          {isDragActive ? "Upuść zdjęcia…" : "Kliknij lub przeciągnij zdjęcia"}
        </p>
      </div>

      <div className="multi-image-preview">
        {previewUrls.map((url, i) => (
          <div
            key={i}
            className="image-preview"
            style={{ position: "relative" }}
          >
            {loadingIdx.includes(i) && (
              <div className="preview-spinner">
                <Spinner />
              </div>
            )}

            <img
              src={url}
              alt={`Zdjęcie ${i}`}
              onLoad={() => setLoadingIdx((p) => p.filter((n) => n !== i))}
              style={{ display: loadingIdx.includes(i) ? "none" : "block" }}
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
