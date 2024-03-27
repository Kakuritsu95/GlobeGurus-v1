import { useDispatch } from "react-redux";
import { setMapCenter } from "../../redux/slices/mapSlice";
import DropdownItem from "../../ui/DropdownItem";
import { RxDotsVertical } from "react-icons/rx";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaMapMarker } from "react-icons/fa";
import Dropdown from "../../ui/Dropdown";
import Modal from "../../ui/Modal";
import PlaceAddEditForm from "./PlaceAddEditForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useParams } from "react-router-dom";

function PlaceItem({ place, index, isEditSession }) {
  const dispatch = useDispatch();
  const { guideId } = useParams();
  return (
    <li
      className="relative flex cursor-pointer flex-col-reverse rounded border-2 p-5 sm:flex-row"
      key={place._id}
      onClick={() => dispatch(setMapCenter(place.coords))}
    >
      <img
        className="rounded sm:h-64 sm:w-96"
        src={place.imageUrl}
        alt="place"
      />
      <div className="w-full space-y-5 sm:ml-10">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h3 className="inline text-xl font-bold text-blue-600">
              {place.name}
            </h3>
            <p className="text-gray-500">{place.address}</p>{" "}
          </div>

          <div className="relative mr-14 h-11 border-b border-gray-800 sm:mr-16 ">
            <FaMapMarker className="text-[2rem] text-slate-600 sm:mx-auto sm:text-[2.6rem]" />

            <h3 className="absolute right-[0.75rem] top-0.5 rounded-full font-bold text-white  sm:right-[1rem] sm:top-0.5 sm:text-lg">
              {index + 1}
            </h3>
          </div>
        </div>
        <ul>
          {place.types.map((type, i) => (
            <span
              key={i}
              className="me-2 rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-800"
            >
              {type}
            </span>
          ))}
        </ul>
        <p>{place.description}</p>
      </div>

      {isEditSession && (
        <Modal>
          <Dropdown absolute={true} position={"right-3 top-4"}>
            <Dropdown.Toggle>
              <RxDotsVertical className="text-xl md:text-2xl" />
            </Dropdown.Toggle>
            <Dropdown.List>
              <Modal.Open opens="edit">
                <div>
                  <DropdownItem>
                    <span>Edit</span>
                    <BiEdit size={22} />
                  </DropdownItem>
                </div>
              </Modal.Open>
              <Modal.Open opens="delete">
                <div>
                  <DropdownItem>
                    <span>Delete</span>
                    <RiDeleteBin2Line size={22} />
                  </DropdownItem>
                </div>
              </Modal.Open>
            </Dropdown.List>
          </Dropdown>
          <Modal.Window adjustPosition="-top-16" name="edit">
            <PlaceAddEditForm placeToEdit={place} />
          </Modal.Window>
          <Modal.Window adjustPosition="-top-44" name="delete">
            <ConfirmDelete
              placeId={place._id}
              guideId={guideId}
              name={place.name}
            />
          </Modal.Window>
        </Modal>
      )}
    </li>
  );
}

export default PlaceItem;
