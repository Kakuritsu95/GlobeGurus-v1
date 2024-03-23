import { Link } from "react-router-dom";

function DropdownItem({ children, handleClick, to, type }) {
  console.log(to);
  if (type === "button")
    return (
      <li>
        <button
          onClick={handleClick}
          className="flex w-full items-center justify-between rounded px-1.5 py-1.5  hover:bg-zinc-200 hover:text-blue-600"
        >
          {children}
        </button>
      </li>
    );
  else if (type === "link")
    return (
      <li>
        <Link
          onClick={handleClick}
          className="flex items-center justify-between rounded px-1.5 py-1.5 hover:bg-zinc-200  hover:text-blue-600"
          to={to}
        >
          {children}
        </Link>
      </li>
    );
  else
    return (
      <li className="flex w-full items-center justify-between rounded px-1.5 py-1.5  hover:bg-zinc-200 hover:text-blue-600">
        {children}
      </li>
    );
}

export default DropdownItem;
