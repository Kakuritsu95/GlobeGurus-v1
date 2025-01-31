import { useDispatch, useSelector } from "react-redux";
import { toggleShowMap } from "../../redux/slices/mapSlice";
import Button from "../../ui/Button";
import { FiMap } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";

function ToggleMapButton() {
  const dispatch = useDispatch();
  const { showMapOnSmallScreens } = useSelector((store) => store.map);

  return (
    <Button handleClick={() => dispatch(toggleShowMap())}>
      <div className="mx-0.5 flex items-center space-x-5">
        {!showMapOnSmallScreens ? (
          <>
            <span className="text-sm">Show Map</span>
            <FiMap size={17} />
          </>
        ) : (
          <>
            <span className="text-sm">Show Info</span>
            <FiInfo size={20} />
          </>
        )}
      </div>
    </Button>
  );
}

export default ToggleMapButton;
