import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PopularNearbyPanel from "./PopularNearbyPanel";
function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`search/?keyword=${query}`);
  }
  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit}>
        <div className="relative mx-auto mt-5 flex w-2/3">
          <input
            type="text"
            className="w-full rounded-l-full bg-slate-200 px-5 py-4 outline-0 focus:shadow-inner-border  focus:shadow-blue-500 "
            placeholder="Search guides by keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="h-14 w-14 rounded-r-full bg-slate-600 hover:bg-slate-500 active:bg-slate-600 ">
            <IoIosSearch className="mx-auto" color="white" size={24} />
          </button>
        </div>
      </form>
      <PopularNearbyPanel />
    </div>
  );
}

export default SearchBar;
