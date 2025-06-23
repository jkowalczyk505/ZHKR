import React, { useState, useEffect, useCallback } from "react";
import Button from "../Button";
import { useDropzone } from "react-dropzone";
import FloatingErrorAlert from "../FloatingErrorAlert";
import Spinner from "../Spinner";

function BreedingModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    nazwa: "",
    numer: "",
    miejscowosc: "",
    gmina: "",
    wojewodztwo: "",
    wlasciciel: "",
    rasy: "",
    telefon: "",
    email: "",
    fb: "",
    ig: "",
    www: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const requiredFields = [
    "nazwa",
    "miejscowosc",
    "wojewodztwo",
    "wlasciciel",
    "numer",
    "rasy",
    "gmina",
  ];

  const fieldLabels = {
    nazwa: "Nazwa hodowli",
    numer: "Numer rejestracyjny",
    miejscowosc: "Miejscowość",
    gmina: "Gmina",
    wojewodztwo: "Województwo",
    wlasciciel: "Właściciel",
    rasy: "Rasy",
    telefon: "Telefon",
    email: "Email",
    fb: "Facebook",
    ig: "Instagram",
    www: "Strona WWW",
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const { zdjecie, ...rest } = initialData;
        setFormData(rest);
        if (typeof zdjecie === "string") {
          setPreviewUrl(zdjecie);
        } else {
          setPreviewUrl("");
        }
        setImageFile(null);
      } else {
        // Resetowanie pustego formularza
        setFormData({
          nazwa: "",
          numer: "",
          miejscowosc: "",
          gmina: "",
          wojewodztwo: "",
          wlasciciel: "",
          rasy: "",
          telefon: "",
          email: "",
          fb: "",
          ig: "",
          www: "",
        });
        setPreviewUrl("");
        setImageFile(null);
      }
    }
  }, [isOpen, initialData]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRemoveImage(false); // reset jeśli dodano nowe
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true); // 🔸 start spinnera

      const payload = {
        ...formData,
        zdjecie: removeImage ? null : imageFile || initialData?.zdjecie,
        usunZdjecie: removeImage,
      };
      await onSave(payload);
      setErrorMessage("");
    } catch (err) {
      let message = err?.message || "Wystąpił błąd podczas zapisu.";
      if (message === "Failed to fetch") {
        message =
          "Brak połączenia z serwerem. Sprawdź internet lub spróbuj później.";
      }
      setErrorMessage(message);
    } finally {
      setIsSaving(false); // 🔸 koniec spinnera
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!isOpen) return null;

  return (
    <div className="breeding-modal-overlay">
      <div className="form-box modal">
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ×
        </button>
        <h2>{initialData ? "Edytuj hodowlę" : "Dodaj hodowlę"}</h2>

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
                <input
                  id={field}
                  name={field}
                  value={value}
                  onChange={handleChange}
                  placeholder={fieldLabels[field]}
                  className="form-field"
                  required={requiredFields.includes(field)}
                />
              </div>
            ))}

            <div className="form-group image-group">
              <label>Zdjęcie hodowli</label>
              {!previewUrl && (
                <div {...getRootProps()} className="dropzone-wrapper">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Upuść zdjęcie tutaj...</p>
                  ) : (
                    <p>Kliknij lub przeciągnij zdjęcie tutaj</p>
                  )}
                </div>
              )}

              {previewUrl && (
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

export default BreedingModal;
