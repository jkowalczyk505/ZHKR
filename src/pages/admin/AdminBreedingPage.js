import React, { useEffect, useState } from "react";
import BreedingItem from "../../components/breedings/BreedingItem";
import Button from "../../components/Button";
import { FaHome } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import CustomAlert from "../../components/CustomAlert";
import BackButton from "../../components/BackButton";
import ErrorMessage from "../../components/ErrorMessage";
import BreedingModal from "../../components/admin/BreedingModal";
import FloatingErrorAlert from "../../components/FloatingErrorAlert";
import ModalContact from "../../components/breedings/ModalContact";

const API_URL = process.env.REACT_APP_API_URL;

function AdminBreedingPage() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirmNumer, setConfirmNumer] = useState(null);
  const [confirmBreeding, setConfirmBreeding] = useState(null);
  const [breedings, setBreedings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [contactModalData, setContactModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBreeding, setSelectedBreeding] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/hodowle`);
        if (!response.ok) {
          throw new Error("Nie udało się pobrać danych z serwera.");
        }
        const data = await response.json();
        const sorted = data.sort((a, b) =>
          a.nazwa.localeCompare(b.nazwa, "pl", { sensitivity: "base" })
        );
        setBreedings(sorted);
      } catch (error) {
        console.error("Błąd podczas pobierania hodowli:", error);
        setError("Nie udało się pobrać danych. Sprawdź połączenie z serwerem.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactClick = (breeding) => {
    setContactModalData({
      name: breeding.nazwa,
      phone: breeding.telefon,
      email: breeding.email,
    });
  };

  const handleAdd = () => {
    setSelectedBreeding(null);
    setModalOpen(true);
  };

  const handleEdit = (numer) => {
    const found = breedings.find((b) => b.numer === numer);
    setSelectedBreeding(found);
    setModalOpen(true);
  };

  const handleDelete = (numer) => {
    const selected = breedings.find((b) => b.numer === numer);
    if (selected) {
      setConfirmNumer(numer);
      setConfirmBreeding(selected);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${API_URL}/api/hodowle/${encodeURIComponent(confirmNumer)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setBreedings((prev) => prev.filter((b) => b.numer !== confirmNumer));
        setAlertMessage("Hodowla została pomyślnie usunięta.");
      } else {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Nie udało się usunąć hodowli.");
      }
    } catch (error) {
      console.error("Błąd przy usuwaniu:", error);
      let msg = error.message || "Wystąpił błąd podczas usuwania.";
      if (msg === "Failed to fetch") {
        msg = "Brak połączenia z serwerem. Sprawdź internet.";
      }
      setDeleteErrorMessage(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setDeleteErrorMessage(""), 7000);
    } finally {
      setConfirmNumer(null);
      setConfirmBreeding(null);
      setIsDeleting(false);
    }
  };

  const handleSave = async (data) => {
    try {
      const isEdit = !!selectedBreeding;

      const formDataToSend = new FormData();

      // Dodaj wszystkie pola formularza jako tekst
      for (const key in data) {
        if (key !== "zdjecie" && key !== "usunZdjecie") {
          formDataToSend.append(key, data[key] || "");
        }
      }

      // Dodaj zdjęcie lub informację o usunięciu
      if (data.usunZdjecie) {
        formDataToSend.append("usunZdjecie", "true");
      } else if (data.zdjecie instanceof File) {
        formDataToSend.append("zdjecie", data.zdjecie);
      }

      const response = await fetch(
        isEdit
          ? `${API_URL}/api/hodowle/${encodeURIComponent(data.numer)}`
          : `${API_URL}/api/hodowle`,
        {
          method: isEdit ? "PUT" : "POST",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Błąd podczas zapisu danych.");
      }

      // Odśwież listę hodowli po zapisie
      const refreshed = await fetch(`${API_URL}/api/hodowle`);
      const refreshedData = await refreshed.json();
      const sorted = refreshedData.sort((a, b) =>
        a.nazwa.localeCompare(b.nazwa, "pl", { sensitivity: "base" })
      );
      setBreedings(sorted);

      setAlertMessage(
        isEdit ? "Hodowla zaktualizowana." : "Dodano nową hodowlę."
      );
      setModalOpen(false);
    } catch (err) {
      console.error("Błąd przy zapisie:", err);
      throw err;
    }
  };

  return (
    <main className="page admin-breeding-page">
      <BackButton />
      <h1>Zarządzanie hodowlami</h1>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      ) : (
        <div className="breeding-list">
          {breedings.length === 0 ? (
            <ErrorMessage message="Brak hodowli do wyświetlenia." />
          ) : (
            breedings.map((breeding) => (
              <div key={breeding.numer} className="breeding-item-wrapper admin">
                <BreedingItem
                  name={breeding.nazwa}
                  image={breeding.zdjecie}
                  city={breeding.miejscowosc}
                  province={breeding.wojewodztwo}
                  owner={breeding.wlasciciel}
                  breeds={breeding.rasy}
                  phone={breeding.telefon}
                  email={breeding.email}
                  fb={breeding.fb}
                  ig={breeding.ig}
                  www={breeding.www}
                  onContactClick={() => handleContactClick(breeding)}
                />

                <div className="admin-controls">
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(breeding.numer)}
                  >
                    Edytuj
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(breeding.numer)}
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!isLoading && !error && (
        <div className="add-breeding">
          <div className="left">
            <FaHome className="home-icon" />
          </div>
          <div className="right">
            <Button variant="secondary" onClick={handleAdd}>
              Dodaj nową hodowlę
            </Button>
          </div>
        </div>
      )}

      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}

      {confirmBreeding && (
        <CustomAlert
          message={`Czy na pewno chcesz usunąć hodowlę "${confirmBreeding.nazwa}"?`}
          onConfirm={confirmDelete}
          onClose={() => {
            setConfirmNumer(null);
            setConfirmBreeding(null);
          }}
          confirmButtonText="Usuń"
          cancelButtonText="Anuluj"
        />
      )}

      {/* 🔽 MODAL DODAWANIA / EDYCJI */}
      <BreedingModal
        isOpen={modalOpen}
        initialData={selectedBreeding}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
      {deleteErrorMessage && (
        <FloatingErrorAlert message={deleteErrorMessage} />
      )}
      {isDeleting && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}

      {contactModalData && (
        <ModalContact
          isOpen={!!contactModalData}
          onClose={() => setContactModalData(null)}
          name={contactModalData.name}
          phone={contactModalData.phone}
          email={contactModalData.email}
        />
      )}
    </main>
  );
}

export default AdminBreedingPage;
