import { Outlet } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import DisplayTopUsers from "../features/users/DisplayTopUsers";
import { useState } from "react";

function Explore() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="relative mt-10 flex flex-col space-y-6">
      <SearchBar />
      <div className="lg:mx-auto lg:w-2/3">
        <Outlet />
        <div
          className={`fixed left-0 top-32 flex items-center duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="relative">
            <DisplayTopUsers />
            <button
              onClick={() => setIsSidebarOpen((open) => !open)}
              className="absolute -right-16 top-1/2 rotate-90 border-2 border-gray-700 bg-gray-600 p-2 text-center text-sm font-semibold text-white hover:border-gray-800"
            >
              TOP GURUS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
