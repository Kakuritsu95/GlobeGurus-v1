import Spinner from "../../ui/Spinner";
import GuideOverview from "./GuideOverview";
import { useNearbyPlaces } from "../nearby-places/NearbyPlacesProvider";
function GuideWindow() {
  const { status } = useNearbyPlaces();
  return (
    <>
      <GuideOverview />
      <div className="col-span-full row-span-full row-start-2 bg-slate-500 md:col-span-3 md:row-start-1"></div>
      {status === "loading" && <Spinner />}
    </>
  );
}

export default GuideWindow;
