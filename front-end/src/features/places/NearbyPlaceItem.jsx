import Button from "../../ui/Button";
import { useNearbyPlaces } from "./NearbyPlacesProvider";

function NearbyPlaceItem({ place, i }) {
  const { selectedPlace, selectNearbyPlace, deselectNearbyPlace } =
    useNearbyPlaces();
  return (
    <li
      key={i}
      className={`rounded border border-gray-200 p-2 xl:flex ${place === selectedPlace && "bg-slate-200"}  xl:h-64 xl:space-x-5`}
    >
      <div
        className="h-60 w-full rounded bg-cover bg-center bg-no-repeat xl:h-auto xl:w-1/2"
        style={{
          backgroundImage: `url(${place.imageUrl || "/public/images/noimagefound.jpg"})`,
        }}
      />
      <div className="flex-col justify-between text-start md:flex xl:w-1/2 2xl:mt-1 2xl:px-5 ">
        <div className="2xl:space-y-8">
          <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900">
            {place.name}
          </h5>
          <p className="mb-3 text-gray-700">{place.address}</p>
        </div>

        <div>
          <Button
            handleClick={() =>
              place === selectedPlace
                ? deselectNearbyPlace()
                : selectNearbyPlace(place)
            }
          >
            {place === selectedPlace ? "Deselect" : "Choose place"}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default NearbyPlaceItem;
