import { Link } from "react-router-dom";

function DropDownLink({ children, handleClick, to, type }) {
  console.log(type);
  if (type === "button")
    return (
      <button
        className="py-1.5 px-1.5 rounded hover:bg-zinc-200 flex items-center justify-between"
        to={to}
      >
        {children}
      </button>
    );
  else
    return (
      <Link
        onClick={handleClick}
        className="py-1.5 px-1.5 rounded hover:bg-zinc-200 flex items-center justify-between"
        to={to}
      >
        {children}
      </Link>
    );
}

export default DropDownLink;
