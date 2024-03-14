import { MapContainer, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import MapEventClick from "./MapEventClick";

function Map() {
  return (
    <MapContainer
      center={[41.136351, 24.887598]}
      zoom={12}
      zoomControl={false}
      className="z-10 col-span-3  cursor-default sm:col-span-2  xl:col-span-2 xl:row-span-full "
    >
      <TileLayer url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=MmCClUoEjeyPsaUgFn4YQoWGwRRqo6JclxsJ0fZRkH3JeMmfgDWvR2P6EcmIl9s1" />
      <MapEventClick />
      <CustomMarker position={[41.136351, 24.887598]} index={1}>
        <div>1</div>
      </CustomMarker>
      <CustomMarker position={[41.1436351, 24.887598]} index={2}>
        <div>1</div>
      </CustomMarker>
      <CustomMarker position={[41.1446351, 24.884598]} index={3}>
        <div>1</div>
      </CustomMarker>
      <CustomMarker position={[41.1445351, 24.884498]} index={4}>
        <div>1</div>
      </CustomMarker>
    </MapContainer>
  );
}

export default Map;
