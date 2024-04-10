import { useState } from "react";
import GuideOverview from "./GuideOverview";
import Map from "../../features/map/Map";
import PlacesList from "../places/PlacesList";
import ToggleMapButton from "./ToggleMapButton";

function GuideWindow() {
  return (
    <div className="relative grid h-[92.95vh] grid-cols-5 grid-rows-3">
      <GuideOverview />
      <PlacesList />
      <Map />
      <ToggleMapButton />
    </div>
  );
}

export default GuideWindow;
