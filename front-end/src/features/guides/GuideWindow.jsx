import { useState } from "react";
import GuideOverview from "./GuideOverview";
import Map from "../../features/map/Map";
import PlacesList from "../places/PlacesList";
function GuideWindow() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="relative grid h-[92.95vh] grid-cols-5 grid-rows-3  ">
      <GuideOverview showMap={showMap} />
      <PlacesList  />
      <Map showMap={showMap} />
      <button
        className="absolute bottom-2 left-1/2 lg:hidden"
        onClick={() => setShowMap((toggle) => !toggle)}
      >
        buttons
      </button>
    </div>
  );
}

export default GuideWindow;
