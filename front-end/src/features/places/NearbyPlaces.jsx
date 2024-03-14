import { useNearbyPlaces } from "./NearbyPlacesProvider";
function NearbyPlaces() {
  const {
    nearbyPlaces,
    selectedPlace,
    selectNearbyPlace,
    deselectNearbyPlace,
  } = useNearbyPlaces();

  return (
    <div className="mx-auto h-[60vh] w-11/12 overflow-auto bg-zinc-200 md:w-full">
      <ul className="space-y-2">
        {nearbyPlaces.map((place) => (
          <li
            key={place.coords[0]}
            className={`rounded border border-gray-200 bg-white p-2 xl:flex ${place === selectedPlace ? "bg-sky-200" : "bg-white"} shadow-lg xl:h-64 xl:space-x-5`}
          >
            <img className="max-w-full rounded" src={place.imageUrl} alt="" />
            <div className="flex-col justify-between md:flex 2xl:mt-1 2xl:px-5 ">
              <div className="2xl:space-y-8">
                <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900">
                  {place.name}
                </h5>
                <p className="mb-3  text-gray-700">{place.address}</p>
              </div>
              <button
                onClick={() =>
                  place === selectedPlace
                    ? deselectNearbyPlace()
                    : selectNearbyPlace(place)
                }
                className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-2 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:w-32 "
              >
                {place === selectedPlace ? "Deselect" : "Choose place"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NearbyPlaces;
