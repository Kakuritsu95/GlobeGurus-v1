import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiMap } from "react-icons/fi";
import { FaBookBookmark } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import DropDownLink from "../ui/DropDownLink";
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
        className="relative rounded-full w-10  hover:bg-blue-200 "
      >
        <img
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
          alt="avatar"
        />
        <div className="absolute top-6 right-0 bg-zinc-500 rounded-full ">
          <RiArrowDropDownLine className="w-3.5 h-3.5 text-white " />
        </div>
      </button>
      <div
        className={`py-2 px-2 z-10 absolute top-10 right-0 bg-zinc-50 rounded w-44 shadow-lg  ${
          isDrowndownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-nowrap flex flex-col text-zinc-600 font-medium">
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
{
  /* <div
  className={`w-7  rounded-full hover:bg-zinc-400 relative ${mediaType[screen]}`}
>
  <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" />
  <div className="absolute bottom-0">
    <IoIosArrowDropdownCircle />
  </div>
</div>; */
}
export default UserDropdown;
