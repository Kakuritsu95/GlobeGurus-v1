import { useSelector } from "react-redux";
import { getUserId } from "../../redux/slices/userSlice";

import useGuide from "../../hooks/useGuide";
import PlaceItem from "./PlaceItem";

function PlacesList() {
  const { data } = useGuide();
  const guide = data || {};
  const places = guide?.places || [];
  const userId = useSelector(getUserId);
  const isEditSession = userId === guide?.owner?._id;

  return (
    <div className="col-span-full row-span-full row-start-2 overflow-auto p-1 shadow-inner-lg sm:mt-0 xl:col-span-3 xl:row-start-1 xl:p-3 2xl:col-span-2">
      <ul className="space-y-5">
        {places.map((place, i) => (
          <PlaceItem
            key={place._id}
            place={place}
            index={i}
            isEditSession={isEditSession}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlacesList;
