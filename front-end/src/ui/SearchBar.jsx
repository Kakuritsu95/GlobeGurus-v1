import { MdOutlineLocationSearching } from "react-icons/md";
function SearchBar() {
  return (
    <form>
      <div className="relative">
        <input
          className="w-64 rounded-full px-3 py-0.5 focus:w-96 focus:transition-all focus:duration-200"
          type="text"
          placeholder="Search by your destination"
        />
        <button>
          <MdOutlineLocationSearching
            type="submit"
            className="absolute right-2 top-1.5"
          />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
