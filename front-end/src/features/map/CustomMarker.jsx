import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customMarkerIcon = (index) =>
  L.divIcon({
    html: `
    <div style="position:relative">
    <span style="position:absolute; left:28%; top:-0.1rem; color:#1985a1; z-index:20; font-size:1.3rem;">${index}</span>
    <img src=/icons/marker.png alt="marker" style="width:40px; position:absolute">
    </div>
    `,
    className: "custom-marker-icon",
    iconSize: [50, 50],
    iconAnchor: [50 / 2, 50 / 2],
  });

function CustomMarker({ position, index, onClick, children }) {
  return (
    <Marker
      position={position}
      icon={customMarkerIcon(index + 1)}
      onClick={onClick}
    >
      {children && <Popup>{children}</Popup>}
    </Marker>
  );
}

export default CustomMarker;
