// PostModal.jsx
import React, { useState, useEffect } from "react";
import Button from "../Button";
import FloatingErrorAlert from "../FloatingErrorAlert";
import MultiImageDropzone from "./MultiImageDropzone";
import Spinner from "../Spinner";

const API_URL = process.env.REACT_APP_API_URL;

function PostModal({ isOpen, onClose, onSave, initialData, postId }) {
  const [formData, setFormData] = useState({
    tytul: "",
    url: "",
    opis: "",
    widocznosc: "1",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [urlManuallyEdited, setUrlManuallyEdited] = useState(false);

  const fieldLabels = {
    tytul: "Tytuł",
    url: "Slug (URL)",
    opis: "Opis",
    widocznosc: "Widoczność",
  };
  const requiredFields = ["tytul", "url", "opis"];

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      const { id, tytul, url, opis, widocznosc } = initialData;
      setFormData({ tytul, url, opis, widocznosc: String(widocznosc ?? 1) });
      setUrlManuallyEdited(true);
      setImageFiles([]);
      setDeletedImages([]);

      setImagesLoading(true);
      fetch(`${API_URL}/api/posts/${id}/images`)
        .then((res) => res.json())
        .then((data) => {
          const urls = data.images.map((img) => `${API_URL}${img.url}`);
          setPreviewUrls(urls);
          setImageFiles(Array(urls.length).fill(null));
        })
        .catch((e) => {
          console.warn("Błąd pobierania zdjęć:", e);
          setPreviewUrls([]);
        })
        .finally(() => {
          setImagesLoading(false);
        });
    } else {
      setFormData({ tytul: "", url: "", opis: "", widocznosc: "1" });
      setPreviewUrls([]);
      setImageFiles([]);
      setDeletedImages([]);
      setUrlManuallyEdited(false);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "tytul" && !urlManuallyEdited) {
        updated.url = generateSlug(value);
      }
      return updated;
    });
    if (name === "url") setUrlManuallyEdited(true);
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      const newImages = imageFiles.filter(Boolean);
      newImages.forEach((f) => fd.append("images", f));
      deletedImages.forEach((name) => fd.append("deleteImage", name));
      await onSave(fd);
      setErrorMessage("");
    } catch (err) {
      let msg = err?.message || "Błąd podczas zapisu";
      if (msg === "Failed to fetch") msg = "Brak połączenia z serwerem";
      setErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!errorMessage) return;
    const t = setTimeout(() => setErrorMessage(""), 5000);
    return () => clearTimeout(t);
  }, [errorMessage]);

  if (!isOpen) return null;

  return (
    <div className="post-modal-overlay">
      <div className="form-box post-modal">
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ×
        </button>
        <h2>{initialData ? "Edytuj aktualność" : "Dodaj aktualność"}</h2>
        <FloatingErrorAlert message={errorMessage} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-grid">
            {Object.entries(formData).map(([field, value]) => (
              <div
                key={field}
                className={`form-group${field === "opis" ? " opis-field" : ""}`}
              >
                <label htmlFor={field}>
                  {fieldLabels[field]}{" "}
                  {requiredFields.includes(field) && (
                    <span className="required">*</span>
                  )}
                </label>
                {field === "opis" ? (
                  <textarea
                    id={field}
                    name={field}
                    value={value}
                    onChange={handleChange}
                    className="form-field"
                    required
                    rows={4}
                  />
                ) : field === "widocznosc" ? (
                  <select
                    id="widocznosc"
                    name="widocznosc"
                    value={value}
                    onChange={handleChange}
                    className="form-field"
                  >
                    <option value="1">Widoczny</option>
                    <option value="0">Ukryty</option>
                  </select>
                ) : field === "url" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      className="form-field"
                      placeholder="Slug (URL)"
                      required
                      type="text"
                      readOnly={!urlManuallyEdited}
                      style={{
                        backgroundColor: !urlManuallyEdited
                          ? "#f0f0f0"
                          : "white",
                      }}
                      title={!urlManuallyEdited && "Kliknij, by edytować slug"}
                      onFocus={() =>
                        !urlManuallyEdited && setUrlManuallyEdited(true)
                      }
                    />
                    {urlManuallyEdited && (
                      <button
                        type="button"
                        className="reset-slug-btn"
                        onClick={() => {
                          setFormData((p) => ({
                            ...p,
                            url: generateSlug(p.tytul),
                          }));
                          setUrlManuallyEdited(false);
                        }}
                        title="Wygeneruj slug na nowo"
                      >
                        ↺ Wygeneruj slug ponownie
                      </button>
                    )}
                  </div>
                ) : (
                  <input
                    id={field}
                    name={field}
                    value={value}
                    onChange={handleChange}
                    className="form-field"
                    placeholder={fieldLabels[field]}
                    required={requiredFields.includes(field)}
                    type="text"
                  />
                )}
              </div>
            ))}
          </div>

          <MultiImageDropzone
            postId={postId}
            label="Zdjęcia posta"
            loading={imagesLoading}
            previewUrls={previewUrls}
            setPreviewUrls={setPreviewUrls}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
          />

          <div className="actions">
            <Button type="submit" variant="primary">
              Zapisz
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
          </div>
        </form>

        {isSaving && (
          <div className="spinner-overlay">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostModal;
