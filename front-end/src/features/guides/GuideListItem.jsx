import { useSelector } from "react-redux";
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
import CommentGuideWindow from "./CommentGuideWindow";
import { GoComment } from "react-icons/go";

import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import Avatar from "../users/Avatar";
import checkIfOnlyExistsInOneArray from "../../helpers/checkIfExistsOnlyInOneArray";

function GuideListItem({ guide, opensAsCommentWindow }) {
  const { id: userId, toggledGuideLikes } = useSelector((store) => store.user);
  const isUserOwner = userId === guide?.owner?._id;
  const isGuideLikedByUser = checkIfOnlyExistsInOneArray(
    guide.likes,
    toggledGuideLikes,
    userId,
    guide._id,
  );
  const isGuideInitiallyLiked = guide.likes.includes(userId);
  return (
    <li className="relative rounded bg-gray-200 p-2 sm:p-5">
      <div className="mb-2 flex items-center gap-3">
        <Avatar avatarUrl={guide.owner.avatarUrl} />
        <Link to={`/guides/user/${guide.owner._id}`}>
          <h3 className="font-semibold text-gray-600 hover:underline">
            {guide.owner.username}
          </h3>
        </Link>
      </div>
      <Link to={`/${APP_ROUTES.GUIDE_VIEW}/${guide._id}`}>
        <h3 className="text-start font-semibold text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:underline md:text-lg">
          {guide.title}
        </h3>
      </Link>
      <div>
        <HorizontalInfoList>
          {`${guide.places.length} Places`}
          {`${isGuideInitiallyLiked ? guide.likes.length + isGuideLikedByUser - 1 : guide.likes.length + isGuideLikedByUser} Likes`}
          {`${guide.comments.length} Comments`}
        </HorizontalInfoList>
        <HorizontalInfoList className="flex space-x-1 text-gray-700">
          {`Created ${formatDateString(guide.createdAt)} `}
          {`Modified ${formatDateString(guide.updatedAt)}`}
        </HorizontalInfoList>

        <Modal>
          <div
            className="sm:w-12/12 relative mt-1 h-96 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${guide.imageUrl})` }}
          >
            <ImageTitleLayout>{guide.territory}</ImageTitleLayout>
          </div>
          <div className="flex justify-between py-1.5 text-lg font-semibold text-gray-700 ">
            <LikeButton
              guideId={guide._id}
              isGuideLikedByUser={isGuideLikedByUser}
            />
            <Modal.Open opens="comment">
              <button className="flex w-full items-center justify-center space-x-2 rounded px-5  py-1 hover:bg-gray-300 hover:text-black hover:underline">
                <GoComment size={22} />
                <span className="hidden sm:inline">Comments</span>
              </button>
            </Modal.Open>
            <BookmarkButton guideId={guide._id} />
          </div>

          {!opensAsCommentWindow && isUserOwner && (
            <Dropdown absolute={true} position={"top-5 right-3"}>
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
          )}
          <Modal.Window adjustPosition="-top-44" name="delete">
            <ConfirmDelete name={guide.title} guideId={guide._id} />
          </Modal.Window>
          <Modal.Window adjustPosition="-top-14" name="comment">
            <CommentGuideWindow guide={guide}></CommentGuideWindow>
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default GuideListItem;
