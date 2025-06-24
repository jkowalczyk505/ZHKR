import React, { useState, useEffect } from "react";
import Button from "../Button";
import FloatingErrorAlert from "../FloatingErrorAlert";
import ImageDropzone from "./ImageDropzone";
import Spinner from "../Spinner";

function PostModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    tytul: "",
    url: "",
    opis: "",
    widocznosc: "1",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fieldLabels = {
    tytul: "Tytuł",
    url: "Slug (URL)",
    opis: "Opis",
    widocznosc: "Widoczność",
  };

  const requiredFields = ["tytul", "url", "opis"];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const { miniatura, ...rest } = initialData;
        setFormData({
          ...rest,
          widocznosc: rest.widocznosc?.toString() || "1",
        });
        setPreviewUrl(miniatura || "");
        setImageFile(null);
        setRemoveImage(false);
      } else {
        setFormData({
          tytul: "",
          url: "",
          opis: "",
          widocznosc: "1",
        });
        setPreviewUrl("");
        setImageFile(null);
        setRemoveImage(false);
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const payload = {
        ...formData,
        zdjecie: removeImage ? null : imageFile || initialData?.miniatura,
        usunZdjecie: removeImage,
      };

      await onSave(payload);
      setErrorMessage("");
    } catch (err) {
      let message = err?.message || "Wystąpił błąd podczas zapisu.";
      if (message === "Failed to fetch") {
        message = "Brak połączenia z serwerem. Sprawdź internet.";
      }
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
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
              <div key={field} className="form-group">
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

            <ImageDropzone
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              setImageFile={setImageFile}
              setRemoveImage={setRemoveImage}
            />
          </div>

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
