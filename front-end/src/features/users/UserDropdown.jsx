import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiMap } from "react-icons/fi";
import { FaBookBookmark } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import DropdownItem from "../../ui/DropdownItem";
import Dropdown from "../../ui/Dropdown";
function UserDropdown({ userId, avatar: avatarUrl }) {
  const dispatch = useDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <div className="mt-1.5">
          <div
            style={{ backgroundImage: `url(${avatarUrl})` }}
            className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat hover:outline hover:outline-2 hover:outline-blue-300 "
          />
          <div className="absolute right-0 top-8 rounded-full bg-zinc-500 ">
            <RiArrowDropDownLine className="h-3.5 w-3.5  text-white" />
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.List>
        <DropdownItem type="link" to={`/guides/${userId}`}>
          <span>My Guides</span>
          <FiMap />
        </DropdownItem>
        <DropdownItem type="link" to={`/bookmarks/${userId}`}>
          <span>Bookmarks</span>
          <FaBookBookmark />
        </DropdownItem>
        <DropdownItem type="link" to={`/profile/${userId}`}>
          <span>Profile</span>
          <RiProfileFill />
        </DropdownItem>
        <DropdownItem
          handleClick={() => {
            dispatch(logoutUser());
          }}
          type="button"
        >
          <span>Logout</span>
          <GiExitDoor />
        </DropdownItem>
      </Dropdown.List>
    </Dropdown>
  );
}

export default UserDropdown;
