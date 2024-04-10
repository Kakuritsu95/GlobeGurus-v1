import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import useGuide from "../../hooks/useGuide";
import { getUserId } from "../../redux/slices/userSlice";
import CustomMarker from "./CustomMarker";
import MapEventClick from "./MapEventClick";
import MoveMap from "./MoveMap";

function Map() {
  const { data } = useGuide();
  const guide = data || {};
  const userId = useSelector(getUserId);
  const { showMapOnSmallScreens } = useSelector((store) => store.map);
  const isEditSession = userId === guide?.owner?._id;

  return (
    <div
      className={`${showMapOnSmallScreens ? "translate-y-0 scale-100 opacity-100" : "-translate-y-full scale-0 opacity-0"} z-10 col-span-5 row-span-1 grid  transition-all duration-500 lg:col-span-3 lg:translate-y-0 lg:scale-100 lg:opacity-100 xl:col-span-2 xl:row-span-full`}
    >
      <MapContainer
        center={[41.13488, 24.888]}
        zoom={14}
        zoomControl={false}
        className="cursor-default"
      >
        <TileLayer url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=MmCClUoEjeyPsaUgFn4YQoWGwRRqo6JclxsJ0fZRkH3JeMmfgDWvR2P6EcmIl9s1" />
        {isEditSession && <MapEventClick />}
        <MoveMap />
        {guide?.places?.length > 0 &&
          guide.places.map((place, index) => (
            <CustomMarker key={index} index={index} position={place.coords}>
              <span>{place.name}</span>
              <img className="min-w-32" src={place.imageUrl} />
            </CustomMarker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
