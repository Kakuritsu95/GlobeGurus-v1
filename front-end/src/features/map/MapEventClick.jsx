import { useMapEvents } from "react-leaflet";
import { useModalContext } from "../../ui/Modal";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import fakeService from "../../services/fakeService";
import { API_ROUTES } from "../../../constants/ROUTES";
function MapEventClick() {
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

export default MapEventClick;
