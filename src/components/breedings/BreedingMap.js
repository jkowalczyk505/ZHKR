import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { TbZoomReset } from "react-icons/tb";
import CustomMarkerIcon from "../../assets/marker-icon.png";
import { useEffect } from "react";

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

function BreedingMap() {
  useEffect(() => {
    const zoomInBtn = document.querySelector(".leaflet-control-zoom-in");
    const zoomOutBtn = document.querySelector(".leaflet-control-zoom-out");

    if (zoomInBtn) zoomInBtn.removeAttribute("title");
    if (zoomOutBtn) zoomOutBtn.removeAttribute("title");
  }, []);
  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        <Marker position={[52.2, 21]} icon={CustomMarker}>
          <Popup>
            Hodowla Warszawa <br /> Rasy: sheltie, california
          </Popup>
        </Marker>

        <ResetViewButton center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

export default BreedingMap;
