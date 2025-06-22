import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { TbZoomReset } from "react-icons/tb";
import CustomMarkerIcon from "../../assets/marker-icon.png";
import axios from "axios";

const center = [52.1, 19.4];
const zoom = 6;

const CustomMarker = new L.Icon({
  iconUrl: CustomMarkerIcon,
  iconSize: [40, 40],
  iconAnchor: [15, 40],
  popupAnchor: [5, -40],
});

function ResetViewButton({ center, zoom }) {
  const map = useMap();
  return (
    <button className="reset-button" onClick={() => map.setView(center, zoom)}>
      <TbZoomReset size={20} />
    </button>
  );
}

function FlyToMarker({ position, icon, children }) {
  const map = useMap();

  const handleClick = () => {
    map.flyTo(position, 9, { duration: 1.2 });
  };

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    >
      <Popup>{children}</Popup>
    </Marker>
  );
}

function BreedingMap() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("https://zhkr.duckdns.org:5005/api/hodowle");
      const data = res.data;

      const geocoded = await Promise.all(
        data.map(async (item) => {
          const address = `${item.miejscowosc}, ${item.gmina}, ${item.wojewodztwo}`;
          try {
            const r = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                address
              )}`,
              {
                headers: {
                  "User-Agent": "ZHKR-website/1.0 (+https://kawierasowe.pl)",
                },
              }
            );
            const geo = await r.json();
            if (geo.length) {
              return {
                ...item,
                coords: [parseFloat(geo[0].lat), parseFloat(geo[0].lon)],
              };
            }
          } catch (e) {
            console.warn("⛔ geocoder error:", e);
          }
          return null;
        })
      );

      const validMarkers = geocoded.filter(Boolean);

      if (validMarkers.length === 0) {
        throw new Error("Nie udało się ustalić lokalizacji hodowli.");
      }

      setMarkers(validMarkers);
    } catch (err) {
      console.error("❌ Błąd pobierania lub geokodowania:", err);
      setError(
        "Nie udało się załadować mapy hodowli. Spróbuj ponownie później."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="map-wrapper">
      {loading && (
        <div className="map-loader">
          <div className="spinner" />
          Ładowanie mapy...
        </div>
      )}

      {error && !loading && (
        <div className="map-error">
          <p>{error}</p>
          <button onClick={fetchData}>Spróbuj ponownie</button>
        </div>
      )}

      {!loading && !error && (
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />

          <MarkerClusterGroup
            chunkedLoading
            showCoverageOnHover={false}
            iconCreateFunction={(cluster) => {
              const count = cluster.getChildCount();
              const size =
                count < 10 ? "small" : count < 100 ? "medium" : "large";

              return L.divIcon({
                html: `<div class="custom-cluster ${size}">${count}</div>`,
                className: "custom-cluster-wrapper",
                iconSize: L.point(40, 40, true),
              });
            }}
          >
            {markers.map((b) => (
              <FlyToMarker
                key={b.numer}
                position={b.coords}
                icon={CustomMarker}
              >
                <strong>{b.nazwa}</strong>
                <br />
                Rasy: {b.rasy}
              </FlyToMarker>
            ))}
          </MarkerClusterGroup>

          <ResetViewButton center={center} zoom={zoom} />
        </MapContainer>
      )}
    </div>
  );
}

export default BreedingMap;
