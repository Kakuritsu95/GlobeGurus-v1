import useGuide from "../../hooks/useGuide";
function PlacesList() {
  const { data } = useGuide();
  const places = data?.places || [];
  console.log(places);
  return (
    <div className="col-span-full row-span-full row-start-2 overflow-auto bg-slate-500 xl:col-span-3 xl:row-start-1">
      <ul className="mx-auto w-full">
        {places.map((place) => (
          <li
            className="mx-auto inline-block w-full text-center"
            key={place._id}
          >
            <h4>{place.name}</h4>
            <span>{place.address}</span>
            <ul>
              {place.types.map((type, i) => (
                <li key={i}>{type}</li>
              ))}
            </ul>
            <img
              className="mx-auto w-12 rounded-full"
              src={place.imageUrl}
              alt="place image"
            />
            <p>{place.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlacesList;
