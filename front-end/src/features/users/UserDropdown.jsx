import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiMap } from "react-icons/fi";
import { FaBookBookmark } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import DropdownItem from "../../ui/DropdownItem";
import Dropdown from "../../ui/Dropdown";
function UserDropdown({ userId }) {
  const dispatch = useDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <div className="mt-1.5">
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
            alt="avatar"
            className="w-10 rounded-full hover:bg-blue-300 sm:w-14"
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
        <DropdownItem type="link" to="/bookmarks">
          <span>Bookmarks</span>
          <FaBookBookmark />
        </DropdownItem>
        <DropdownItem type="link" to="/profile">
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
