import { Outlet } from "react-router-dom";
import SearchBar from "../ui/SearcBar";
import DisplayTopUsers from "../features/users/DisplayTopUsers";

function Explore() {
  return (
    <div className="flex h-full justify-around">
      <div className=" xl:w-1/4"></div>
      <div className="relative flex h-full flex-col space-y-5 sm:w-2/3 xl:w-2/4">
        <SearchBar />
        <Outlet />
      </div>
      <DisplayTopUsers />
    </div>
  );
}

export default Explore;
