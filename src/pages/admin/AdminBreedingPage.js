import React, { useEffect, useState } from "react";
import BreedingItem from "../../components/breedings/BreedingItem";
import Button from "../../components/Button";
import { FaHome } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import CustomAlert from "../../components/CustomAlert";
import BackButton from "../../components/BackButton";
import ErrorMessage from "../../components/ErrorMessage";
import BreedingModal from "../../components/admin/BreedingModal";
const API_URL = process.env.REACT_APP_API_URL;

function AdminBreedingPage() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirmNumer, setConfirmNumer] = useState(null);
  const [confirmBreeding, setConfirmBreeding] = useState(null);
  const [breedings, setBreedings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error("Nie udało się usunąć hodowli");
      }
    } catch (error) {
      console.error("Błąd przy usuwaniu:", error);
    } finally {
      setConfirmNumer(null);
      setConfirmBreeding(null);
    }
  };

  const handleSave = async (data) => {
    try {
      const isEdit = !!data.numer;

      const response = await fetch(
        isEdit
          ? `${API_URL}/api/hodowle/${encodeURIComponent(data.numer)}`
          : `${API_URL}/api/hodowle`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json(); // ZAWSZE odczytaj json() jako pierwszy

      if (!response.ok) {
        throw new Error(result.message || "Błąd podczas zapisu danych.");
      }

      setBreedings((prev) => {
        if (isEdit) {
          return prev.map((b) => (b.numer === result.numer ? result : b));
        } else {
          return [...prev, result];
        }
      });

      setAlertMessage(
        isEdit ? "Hodowla zaktualizowana." : "Dodano nową hodowlę."
      );
      setModalOpen(false);
    } catch (err) {
      console.error("Błąd przy zapisie:", err);
      // RZUCAMY DALEJ DO MODALA
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
    </main>
  );
}

export default AdminBreedingPage;
