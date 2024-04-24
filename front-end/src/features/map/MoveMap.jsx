import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";

function MoveMap() {
  const { mapCenter, switcher } = useSelector((store) => store.map);

  const map = useMap();
  useEffect(() => {
    if (mapCenter.length == 0) return;
    map.flyTo(mapCenter);
  }, [mapCenter, switcher]);
}

export default MoveMap;
