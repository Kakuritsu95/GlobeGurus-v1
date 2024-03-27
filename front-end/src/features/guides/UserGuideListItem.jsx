import HorizontalInfoList from "../../ui/HorizontalInfoList";
import Dropdown from "../../ui/Dropdown";
import formatDateString from "../../helpers/formatDateString";
import { RxDotsVertical } from "react-icons/rx";
import DropdownItem from "../../ui/DropdownItem";
import { APP_ROUTES } from "../../../constants/Routes";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
function UserGuideListItem({ guide }) {
  return (
    <li className="relative bg-slate-200 p-2">
      <h3 className="font-semibold text-blue-600">{guide.title}</h3>
      <div>
        <HorizontalInfoList>
          {`${guide.places.length} places`}
          {`${guide.thumbsUp.length} thumbs up`}
        </HorizontalInfoList>
        <HorizontalInfoList className="flex space-x-1  text-gray-700">
          {`Created ${formatDateString(guide.createdAt)} `}
          {`Modified ${formatDateString(guide.updatedAt)}`}
        </HorizontalInfoList>
        <div className="relative w-full sm:w-7/12">
          <img src={guide.imageUrl} alt="territory" className="rounded" />
          <h4 className="absolute left-3 top-1 text-lg  font-semibold text-gray-50">
            {guide.territory}
          </h4>
        </div>
        <Modal>
          <Dropdown absolute={true} position={"top-3 right-2"}>
            <Dropdown.Toggle>
              <RxDotsVertical size={22} />
            </Dropdown.Toggle>
            <Dropdown.List>
              <DropdownItem
                type="link"
                to={`/${APP_ROUTES.GUIDE_EDIT}/${guide._id}`}
              >
                Edit
              </DropdownItem>

              <Modal.Open opens="delete">
                <div>
                  <DropdownItem type="button">Delete this guide</DropdownItem>
                </div>
              </Modal.Open>
            </Dropdown.List>
          </Dropdown>
          <Modal.Window adjustPosition="-top-44" name="delete">
            <ConfirmDelete name={guide.title} guideId={guide._id} />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default UserGuideListItem;
