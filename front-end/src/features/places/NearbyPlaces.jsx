import { useNearbyPlaces } from "./NearbyPlacesProvider";
import Button from "../../ui/Button";
function NearbyPlaces() {
  const {
    nearbyPlaces,
    selectedPlace,
    selectNearbyPlace,
    deselectNearbyPlace,
  } = useNearbyPlaces();

  return (
    <div className="mx-auto h-[60vh] w-11/12 overflow-auto bg-zinc-50 md:w-full">
      <ul className="space-y-2">
        {nearbyPlaces.map((place, i) => (
          <li
            key={i}
            className={`rounded border border-gray-200 p-2 xl:flex ${place === selectedPlace && "bg-slate-200"}  xl:h-64 xl:space-x-5`}
          >
            <img
              className="w-full rounded xl:w-96"
              src={place.imageUrl}
              alt=""
            />

            <div className="flex-col justify-between text-start md:flex 2xl:mt-1 2xl:px-5 ">
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
        ))}
      </ul>
    </div>
  );
}

export default NearbyPlaces;
