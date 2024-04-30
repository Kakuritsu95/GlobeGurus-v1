import GuideOverview from "./GuideOverview";
import Map from "../../features/map/Map";
import PlacesList from "../places/PlacesList";
import ToggleMapButton from "./ToggleMapButton";
import useGuide from "../../hooks/useGuide";

function GuideWindow() {
  const { guide, isFetching } = useGuide();
  if (!guide) return null;
  return (
    <div className="relative grid h-[92.95vh] grid-cols-5 grid-rows-3">
      <GuideOverview guide={guide} />
      <PlacesList guide={guide} />
      {!isFetching && <Map guide={guide} />}
      <ToggleMapButton />
    </div>
  );
}

export default GuideWindow;
