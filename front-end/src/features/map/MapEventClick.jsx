import { useMapEvents } from "react-leaflet";
import { useModalContext } from "../../ui/Modal";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import { nearbyPlacesService } from "../../services/services";
function MapEventClick() {
  const { openModal } = useModalContext();
  const { updateNearbyPlaces, clickedCoords } = useNearbyPlaces();

  useMapEvents({
    click: async (e) => {
      try {
        clickedCoords.current.coords = [e.latlng.lat, e.latlng.lng];
        const data = await nearbyPlacesService.get(e.latlng.lat, e.latlng.lng);

        // const res = await fetch(
        //   `${API_ROUTES.NEARBY_PLACES}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
        // );
        // const data = await res.json();

        // const data = await fakeService(true);
        openModal("place tab");
        updateNearbyPlaces(data);
      } catch (err) {
        console.log(err);
      }
    },
  });
}

export default MapEventClick;
