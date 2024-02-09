import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import NavLinkItem from "./NavLinkItem";
import UserDropdown from "../features/UserDropdown";
function Navbar() {
  const [open, setOpen] = useState(false);
  function handleToggleDropdown() {
    setOpen((prevState) => !prevState);
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="inline-flex items-center space-x-5">
          <UserDropdown
            screen="smallScreen"
            hideOnLargeScreens={"md:hidden"}
          ></UserDropdown>
          <button
            onClick={handleToggleDropdown}
            className=" p-1 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <RxHamburgerMenu className="w-6 h-6 mx-auto"></RxHamburgerMenu>
          </button>
        </div>
        <div
          className={`${
            !open && "hidden"
          } w-full  md:w-auto md:flex items-center`}
        >
          <div className="flex space-x-6">
            <ul className="font-medium flex w-full flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
              <NavLinkItem to="/">Home</NavLinkItem>
              <NavLinkItem to="/explore">Explore</NavLinkItem>
              <NavLinkItem to="login">Login</NavLinkItem>
            </ul>
            <UserDropdown screen="largeScreen"></UserDropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
