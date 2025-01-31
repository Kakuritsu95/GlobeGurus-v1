import GuideOverview from "./GuideOverview";
import Map from "../../features/map/Map";
import PlacesList from "../places/PlacesList";
import ToggleMapButton from "./ToggleMapButton";
import useGuide from "../../hooks/useGuide";
import { useState } from "react";
import ToggleMapOverviewButton from "./ToggleMapOverviewButton";

function GuideWindow() {
  const { guide, isFetching } = useGuide();
  const [showMapOverview, setShowMapOverview] = useState(true);
  if (!guide) return null;
  return (
    <div className="relative grid h-[92.95vh] grid-cols-5 grid-rows-3">
      <GuideOverview guide={guide} showMapOverview={showMapOverview} />
      <PlacesList showMapOverview={showMapOverview} guide={guide} />
      {!isFetching && <Map guide={guide} showMapOverview={showMapOverview} />}
      <div className="absolute bottom-12 left-1/2 flex w-full -translate-x-1/2 justify-center space-x-5 sm:left-1/2 lg:hidden">
        {showMapOverview && <ToggleMapButton />}
        <ToggleMapOverviewButton
          setShowMapOverview={setShowMapOverview}
          showMapOverview={showMapOverview}
        />
      </div>
    </div>
  );
}

export default GuideWindow;
