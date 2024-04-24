import { useMapEvents } from "react-leaflet";
import { useModalContext } from "../../ui/Modal";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import { nearbyPlacesService } from "../../services/services";
import fakeService from "../../services/fakeService";
function MapEventClick() {
  const { openModal } = useModalContext();
  const { updateNearbyPlaces, clickedCoords } = useNearbyPlaces();

  useMapEvents({
    click: async (e) => {
      try {
        clickedCoords.current.coords = [e.latlng.lat, e.latlng.lng];
        // const data = await nearbyPlacesService.get(e.latlng.lat, e.latlng.lng);
        openModal("place tab");

        const data = await fakeService(true);
        updateNearbyPlaces(data);
      } catch (err) {
        updateNearbyPlaces([]);
        openModal("place tab");
      }
    },
  });
}

export default MapEventClick;
