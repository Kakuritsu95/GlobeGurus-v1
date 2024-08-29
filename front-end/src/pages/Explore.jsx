import { Outlet } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import DisplayTopUsers from "../features/users/DisplayTopUsers";
import GuidePagination from "../features/guides/GuidePagination";

function Explore() {
  return (
    <div className="flex h-full justify-around py-5">
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
