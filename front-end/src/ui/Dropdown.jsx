import { useState } from "react";
import { createContext, useContext } from "react";
import useDetectClick from "../hooks/useDetectClick";

const DropdownContext = createContext();
function Dropdown({ children, absolute, position = "right-0 top-0" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useDetectClick(closeDropdown);
  function toggleDropdown() {
    setIsOpen((open) => !open);
  }
  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown }}>
      <div ref={ref} className={`${absolute && "absolute"} ${position}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function Toggle({ children }) {
  const { toggleDropdown } = useContext(DropdownContext);

  return <button onClick={toggleDropdown}>{children}</button>;
}

function List({ size = "default", position = "right-0 top-full", children }) {
  const { isOpen, closeDropdown } = useContext(DropdownContext);

  const type = {
    small: "w-36",
    default: "w-44",
  };
  const style = `absolute ${position} z-20 ${type[size]} rounded bg-zinc-50 px-2 py-2 shadow-lg  ${
    isOpen ? "block" : "hidden"
  }`;
  return (
    isOpen && (
      <div className={style}>
        <ul
          onClick={closeDropdown}
          className="flex cursor-pointer flex-col text-nowrap font-medium text-zinc-600"
        >
          {children}
        </ul>
      </div>
    )
  );
}

Dropdown.List = List;
Dropdown.Toggle = Toggle;
export default Dropdown;
