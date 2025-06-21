import React, { useRef, useEffect, useState } from "react";
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
  iconSize: [40, 40], // dostosuj do rozmiaru grafiki
  iconAnchor: [15, 40], // punkt kotwiczenia na dole ikonki
  popupAnchor: [5, -40], // gdzie pojawi się popup względem ikonki
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

  useEffect(() => {
    const zoomInBtn = document.querySelector(".leaflet-control-zoom-in");
    const zoomOutBtn = document.querySelector(".leaflet-control-zoom-out");

    if (zoomInBtn) zoomInBtn.removeAttribute("title");
    if (zoomOutBtn) zoomOutBtn.removeAttribute("title");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
            return null; // jeśli nie znaleziono współrzędnych
          })
        );

        setMarkers(geocoded.filter(Boolean));
        setTimeout(() => setLoading(false), 0);
      } catch (err) {
        console.error("Błąd podczas pobierania lub geokodowania:", err);
      } finally {
        setLoading(false);
      }
    };

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
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className={`map-container ${loading ? "loading" : ""}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        {!loading && (
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
        )}

        <ResetViewButton center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

export default BreedingMap;
