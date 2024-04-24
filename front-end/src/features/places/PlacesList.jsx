import { useSelector } from "react-redux";
import { getUserId } from "../../redux/slices/userSlice";
import PlaceItem from "./PlaceItem";
import EmptyItemsMessage from "../../ui/EmptyItemsMessage";

function PlacesList({ guide }) {
  const places = guide?.places || [];
  const userId = useSelector(getUserId);
  const isEditSession = userId === guide?.owner?._id;

  return (
    <div className="col-span-full row-span-full row-start-2 overflow-auto p-1 shadow-inner-lg sm:mt-0 xl:col-span-3 xl:row-start-1 xl:p-3 2xl:col-span-2">
      {places.length === 0 ? (
        <EmptyItemsMessage>
          {isEditSession
            ? `It seems that you dont have any locations added to this guide, start by
          clicking on the map and choose a nearby location to add or move to the
          next tab to add a custom place.`
            : `This guide has no locations added yet`}
        </EmptyItemsMessage>
      ) : (
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
      )}
    </div>
  );
}

export default PlacesList;
