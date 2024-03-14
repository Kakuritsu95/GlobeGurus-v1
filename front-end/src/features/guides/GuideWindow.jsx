import Spinner from "../../ui/Spinner";
import { useNearbyPlaces } from "../places/NearbyPlacesProvider";
import GuideOverview from "./GuideOverview";
import PlacesList from "../places/PlacesList";
function GuideWindow() {
  const { status } = useNearbyPlaces();
  return (
    <>
      <GuideOverview />
      <PlacesList />
      {status === "loading" && <Spinner />}
    </>
  );
}

export default GuideWindow;
