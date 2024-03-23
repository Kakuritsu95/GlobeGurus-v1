import { useMapEvents } from "react-leaflet";
import { useModalContext } from "../../ui/Modal";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import fakeService from "../../services/fakeService";
import { API_ROUTES } from "../../../constants/ROUTES";
function MapEventClick() {
  const { openModal } = useModalContext();
  const { updateNearbyPlaces, clickedCoords } = useNearbyPlaces();

  useMapEvents({
    click: async (e) => {
      try {
        clickedCoords.current.coords = [e.latlng.lat, e.latlng.lng];

        //REAL SERVICE
        // const res = await fetch(
        //   `${API_ROUTES.NEARBY_PLACES}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
        // );
        // const data = await res.json();
        //FAKE SERVICE
        const data = await fakeService(true);
        openModal("place tab");
        updateNearbyPlaces(data);
      } catch {}
    },
  });
}

export default MapEventClick;
