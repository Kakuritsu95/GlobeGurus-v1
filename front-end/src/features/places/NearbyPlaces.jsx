import { useNearbyPlaces } from "./NearbyPlacesProvider";
import NearbyPlaceItem from "./NearbyPlaceItem";
import EmptyItemsMessage from "../../ui/EmptyItemsMessage";
function NearbyPlaces() {
  const { nearbyPlaces } = useNearbyPlaces();

  return (
    <div className="mx-auto h-[60vh] w-11/12 overflow-auto bg-zinc-50 md:w-[36vw]">
      {nearbyPlaces.length == 0 ? (
        <div className="h-full bg-gray-50 py-16">
          <EmptyItemsMessage>
            No nearby places found press next to add a new place to your guide
            or click somewhere else on the map
          </EmptyItemsMessage>
        </div>
      ) : (
        <ul className="space-y-2">
          {nearbyPlaces.map((place, i) => (
            <NearbyPlaceItem place={place} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default NearbyPlaces;
