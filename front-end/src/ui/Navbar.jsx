import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import NavLinkItem from "./NavLinkItem";
import UserDropdown from "../features/users/UserDropdown";
import Button from "./Button";
import { Link } from "react-router-dom";
function Navbar() {
  const [open, setOpen] = useState(false);
  function handleToggleDropdown() {
    setOpen((prevState) => !prevState);
  }
  return (
    <nav className="sticky top-0 z-50 border-gray-200 bg-white shadow dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Logo />
        <div className="inline-flex items-center space-x-5">
          <div className="relative flex md:hidden">
            {/* <UserDropdown /> */}
          </div>

          <button
            onClick={handleToggleDropdown}
            className="h-10 w-10 rounded text-gray-500 focus:ring-2 focus:ring-zinc-200 md:hidden dark:text-zinc-600"
          >
            <RxHamburgerMenu className="mx-auto h-6 w-6 "></RxHamburgerMenu>
          </button>
        </div>
        <div
          className={`${
            !open && "hidden"
          } w-full  items-center md:flex md:w-auto`}
        >
          <div className="flex space-x-6">
            <ul className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row  md:space-x-8 md:border-0 md:bg-white md:p-0">
              <NavLinkItem to="/">Home</NavLinkItem>
              <NavLinkItem to="/explore">Explore</NavLinkItem>
              <div className="mt-6 flex w-full flex-col space-y-3 px-3 md:hidden">
                <Button type="brand" to="/login">
                  Login
                </Button>

                <span className="text-center font-light">
                  dont have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold underline hover:text-blue-800"
                  >
                    Sign-up
                  </Link>
                </span>
              </div>
            </ul>
            <div className="relative hidden md:flex">
              {/* <UserDropdown /> */}
              <Button to="signup" type="brand">
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
