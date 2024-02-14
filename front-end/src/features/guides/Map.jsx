import { MapContainer, TileLayer } from "react-leaflet";
function Map() {
  return (
    <MapContainer
      center={[41.136351, 24.887598]}
      zoom={12}
      zoomControl={false}
      className=" z-10 col-span-2 cursor-default hover:border-zinc-800 md:col-span-2 md:row-span-full"
    >
      <TileLayer url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=MmCClUoEjeyPsaUgFn4YQoWGwRRqo6JclxsJ0fZRkH3JeMmfgDWvR2P6EcmIl9s1" />
    </MapContainer>
  );
}

export default Map;
