import { useState } from "react";
import placeTags from "../../../data/placeTags";
import { RiArrowDropDownLine } from "react-icons/ri";
function DisplayAddPlaceType({ register }) {
  const [isOpen, setIsOpen] = useState();
  return (
    <div className="space-y-4">
      <button
        className="flex w-28 items-center justify-start rounded px-2 py-1.5 text-sm hover:bg-zinc-300"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        Select tags
        <RiArrowDropDownLine className="ml-0.5 text-lg" />
      </button>

      {isOpen && (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5 lg:grid-cols-3 lg:gap-x-10  2xl:grid-cols-4">
          {placeTags.map((tag, i) => (
            <li
              key={i}
              className="font-gray flex  justify-between space-x-1 text-sm"
            >
              <label htmlFor={tag}>{tag}</label>
              <input
                type="checkbox"
                id={tag}
                name={tag}
                value={tag}
                {...register("types")}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayAddPlaceType;
