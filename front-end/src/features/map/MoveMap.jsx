import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { getMapCenter } from "../../redux/slices/mapSlice";
function MoveMap() {
  const mapCenter = useSelector(getMapCenter);
  const map = useMap();
  useEffect(() => {
    map.zoomIn();
    map.flyTo(mapCenter);
  }, [mapCenter]);
}

export default MoveMap;
