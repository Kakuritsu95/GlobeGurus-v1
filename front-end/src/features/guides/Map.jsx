import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useModalContext } from "../../ui/Modal";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import fakeService from "../../services/fakeService";
import { API_ROUTES } from "../../../constants/apiRoutes";
function GetClickCoords() {
  const { openModal } = useModalContext();
  const { updateNearbyPlaces, clickedCoords, dispatch } = useNearbyPlaces();

  useMapEvents({
    click: async (e) => {
      try {
        clickedCoords.current.coords = [e.latlng.lat, e.latlng.lng];
        console.log(clickedCoords);
        dispatch({ type: "nearbyPlaces/loading" });
        //REAL SERVICE
        // const res = await fetch(
        //   `${API_ROUTES.NEARBY_PLACES}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
        // );
        // const data = await res.json();
        //FAKE SERVICE
        const data = await fakeService(true);
        openModal();
        updateNearbyPlaces(data);
        dispatch({ type: "nearbyPlaces/idle" });
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
      className="z-10 col-span-2 h-full cursor-default md:col-span-2 md:row-span-full "
    >
      <TileLayer url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=MmCClUoEjeyPsaUgFn4YQoWGwRRqo6JclxsJ0fZRkH3JeMmfgDWvR2P6EcmIl9s1" />
      <GetClickCoords />
    </MapContainer>
  );
}

export default Map;
