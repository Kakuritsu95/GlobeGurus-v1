import SearchBar from "../ui/SearcBar";
import { Outlet } from "react-router-dom";

function Explore() {
  return (
    <div className="mx-auto flex h-full flex-col space-y-5 sm:w-2/3 xl:w-2/4">
      <SearchBar />
      <Outlet />
    </div>
  );
}

export default Explore;
