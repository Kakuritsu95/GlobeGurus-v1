import { useState } from "react";
import placeTypes from "../../../constants/placeTypes";
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
        <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5 lg:grid-cols-3 lg:gap-x-20  ">
          {placeTypes.map((tag, i) => (
            <li
              key={i}
              className="font-gray cursor-pointer rounded p-1 text-sm hover:bg-gray-300"
            >
              <label
                htmlFor={tag}
                className="flex w-full cursor-pointer justify-between space-x-1"
              >
                <span>{tag}</span>
                <input
                  type="checkbox"
                  id={tag}
                  name={tag}
                  value={tag}
                  {...register("types")}
                />
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayAddPlaceType;
