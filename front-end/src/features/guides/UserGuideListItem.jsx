import { Link } from "react-router-dom";
import formatDateString from "../../helpers/formatDateString";
import HorizontalInfoList from "../../ui/HorizontalInfoList";
import Modal from "../../ui/Modal";
import Dropdown from "../../ui/Dropdown";
import DropdownItem from "../../ui/DropdownItem";
import { APP_ROUTES } from "../../../constants/Routes";
import { RxDotsVertical } from "react-icons/rx";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ImageTitleLayout from "../../ui/ImageTitleLayout";

import { GoComment } from "react-icons/go";
import { BsBookmarkStar } from "react-icons/bs";

import { useState } from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

function UserGuideListItem({ guide }) {
  const [localLikes, setLocalLikes] = useState(guide.likes);

  return (
    <li className="relative bg-neutral-100 p-2">
      <Link to={`/${APP_ROUTES.GUIDE_VIEW}/${guide._id}`}>
        <h3 className="font-semibold text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:underline md:text-lg">
          {guide.title}
        </h3>
      </Link>
      <div>
        <HorizontalInfoList>
          {`${guide.places.length} Places`}
          {`${localLikes.length} Likes`}
        </HorizontalInfoList>
        <HorizontalInfoList className="flex space-x-1 text-gray-700">
          {`Created ${formatDateString(guide.createdAt)} `}
          {`Modified ${formatDateString(guide.updatedAt)}`}
        </HorizontalInfoList>

        <div
          className="sm:w-12/12 relative h-80 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${guide.imageUrl})` }}
        >
          <ImageTitleLayout>{guide.territory}</ImageTitleLayout>
        </div>
        <div className="flex justify-between py-1.5 text-lg font-semibold text-gray-700 ">
          <LikeButton
            guideId={guide._id}
            localLikes={localLikes}
            setLocalLikes={setLocalLikes}
          />

          <button className="flex w-full items-center justify-center space-x-2 rounded  px-5 py-1 hover:bg-gray-300 hover:text-black">
            <GoComment size={22} />
            <span className="hidden sm:inline">Comments</span>
          </button>
          <BookmarkButton guideId={guide._id} />
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
