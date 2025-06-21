import React, { useEffect, useState } from "react";
import axios from "axios";
import BreedingTile from "./BreedingTile";

const API_URL = process.env.REACT_APP_API_URL;

function AllBreadingSection() {
    const [breedings, setBreedings] = useState([]);

    useEffect(() => {
        const fetchBreedings = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/hodowle`);
            setBreedings(res.data);
        } catch (err) {
            console.error("Błąd pobierania hodowli:", err);
        }
        };

        fetchBreedings();
    }, []);

    return (
        <section className="all-breadings light-section">
            <h2 className="with-line all-breadings-h">Wszystkie hodowle</h2>
            <div className="breeding-tile-list">
                {breedings.map((b) => (
                <BreedingTile
                    key={b.numer}
                    name={b.nazwa}
                    number={b.numer}
                    image={b.zdjecie}
                    city={b.miejscowosc}
                    province={b.wojewodztwo}
                    owner={b.wlasciciel}
                    breeds={b.rasy}
                    phone={b.telefon}
                    email={b.email}
                    fb={b.fb}
                    ig={b.ig}
                    www={b.www}
                />
                ))}
            </div>
        </section>
    )
}

export default AllBreadingSection;