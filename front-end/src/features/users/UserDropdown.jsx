import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiMap } from "react-icons/fi";
import { FaBookBookmark } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import DropDownLink from "../../ui/DropDownLink";
function UserDropdown({ screen }) {
  const [isDrowndownOpen, setIsDropdownOpen] = useState(false);
  function toggleDropdown() {
    setIsDropdownOpen((isOpen) => !isOpen);
  }
  const mediaType = {
    smallScreen: "flex md:hidden",
    largeScreen: "hidden md:flex",
  };
  return (
    <div className={`relative ${mediaType[screen]}`}>
      <button
        onClick={toggleDropdown}
        className="relative w-10 rounded-full  hover:bg-blue-200 "
      >
        <img
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
          alt="avatar"
        />
        <div className="absolute right-0 top-6 rounded-full bg-zinc-500 ">
          <RiArrowDropDownLine className="h-3.5 w-3.5 text-white " />
        </div>
      </button>
      <div
        className={`absolute right-0 top-10 z-20 w-44 rounded bg-zinc-50 px-2 py-2 shadow-lg  ${
          isDrowndownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col text-nowrap font-medium text-zinc-600">
          <DropDownLink handleClick={toggleDropdown} to="/guides">
            <span>My Guides</span>
            <FiMap />
          </DropDownLink>
          <DropDownLink handleClick={toggleDropdown} to="/bookmarks">
            <span>Bookmarks</span>
            <FaBookBookmark />
          </DropDownLink>
          <DropDownLink handleClick={toggleDropdown} to="/profile">
            <span>Profile</span>
            <RiProfileFill />
          </DropDownLink>
          <DropDownLink type="button">
            <span>Logout</span>
            <GiExitDoor />
          </DropDownLink>
        </ul>
      </div>
    </div>
  );
}

export default UserDropdown;
