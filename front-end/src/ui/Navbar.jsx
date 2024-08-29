import { useState } from "react";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import NavLinkItem from "./NavLinkItem";
import UserDropdown from "../features/users/UserDropdown";
import Button from "./Button";
import { Link } from "react-router-dom";
function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);

  function handleToggleDropdown() {
    setOpen((prevState) => !prevState);
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-gray-100 ">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Logo />
        <div className="inline-flex items-center space-x-5">
          <div className="relative flex md:hidden">
            {user.id && <UserDropdown userId={user.id} avatar={user.avatar} />}
          </div>

          <button
            onClick={handleToggleDropdown}
            className="h-10 w-10 rounded text-gray-500 focus:ring-2 focus:ring-zinc-200 md:hidden"
          >
            <RxHamburgerMenu className="mx-auto h-6 w-6" />
          </button>
        </div>
        <div
          className={`${
            !open && "hidden"
          } w-full  items-center md:flex md:w-auto`}
        >
          <div className="flex  space-x-6">
            <ul className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-100  p-4 font-medium md:mt-0 md:flex-row  md:space-x-8 md:border-0 md:p-0">
              <NavLinkItem to="/">Home</NavLinkItem>
              <NavLinkItem to="/explore/popular?page=1">Explore</NavLinkItem>
              {!user.id && (
                <div className="mt-6 flex w-full flex-col space-y-3 px-3 md:hidden">
                  <Button
                    type="brand"
                    to="/login"
                    handleClick={handleToggleDropdown}
                  >
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
              )}
            </ul>
            <div className="relative hidden md:flex">
              {user.id ? (
                <UserDropdown userId={user.id} avatar={user.avatar} />
              ) : (
                <div>
                  <Button to="login" type="brand">
                    Sign in
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
