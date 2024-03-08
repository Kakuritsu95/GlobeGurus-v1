import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useModalContext } from "../../ui/Modal";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import fakeService from "../../services/fakeService";
import { API_ROUTES } from "../../../constants/ROUTES";
function GetClickCoords() {
  const { openModal } = useModalContext();
  const { updateNearbyPlaces, clickedCoords, dispatch } = useNearbyPlaces();

  useMapEvents({
    click: async (e) => {
      try {
        clickedCoords.current.coords = [e.latlng.lat, e.latlng.lng];
       
        dispatch({ type: "nearbyPlaces/loading" });
        //REAL SERVICE
        // const res = await fetch(
        //   `${API_ROUTES.NEARBY_PLACES}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
        // );
        // const data = await res.json();
        //FAKE SERVICE
        const data = await fakeService(true);
        dispatch({ type: "nearbyPlaces/idle" });
        openModal();
        updateNearbyPlaces(data);
      } catch {}
    },
  });
}
function Map() {
  return (
    <MapContainer
      center={[41.136351, 24.887598]}
      zoom={12}
      zoomControl={false}
      className="z-10 col-span-2 h-full cursor-default sm:col-span-3 xl:col-span-2 xl:row-span-full "
    >
      <TileLayer url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=MmCClUoEjeyPsaUgFn4YQoWGwRRqo6JclxsJ0fZRkH3JeMmfgDWvR2P6EcmIl9s1" />
      <GetClickCoords />
    </MapContainer>
  );
}

export default Map;
