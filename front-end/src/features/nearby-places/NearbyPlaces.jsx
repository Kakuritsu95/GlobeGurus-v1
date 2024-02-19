import { useNearbyPlaces } from "./NearbyPlacesProvider";
function NearbyPlaces() {
  const { nearbyPlaces, selectedPlace, selectNearbyPlace } = useNearbyPlaces();

  return (
    <div className="h-[60vh] overflow-auto bg-zinc-200">
      <ul className="space-y-2">
        {nearbyPlaces.map((place) => (
          <li
            key={place.coords[0]}
            className={`rounded border border-gray-200 bg-white p-2 2xl:flex dark:border-gray-700 dark:bg-gray-800 ${place === selectedPlace ? "bg-slate-200" : "bg-white"} shadow-lg xl:h-64 xl:space-x-5`}
          >
            <img className="max-w-72 rounded" src={place.imageUrl} alt="" />
            <div className="flex-col justify-between md:flex 2xl:mt-1 2xl:px-5 ">
              <div className=" 2xl:space-y-8">
                <h5 className=" my-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {place.name}
                </h5>
                <p className="mb-3  text-gray-700 dark:text-gray-400">
                  {place.address}
                </p>
              </div>
              <button
                onClick={() => selectNearbyPlace(place)}
                className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-2 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:w-32 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {place === selectedPlace ? "Selected" : "Choose place"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NearbyPlaces;
