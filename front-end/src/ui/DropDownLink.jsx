import { Link } from "react-router-dom";
const styledDropDownLink =
  "flex items-center justify-between rounded px-1.5 py-1.5 hover:bg-zinc-200  hover:text-blue-600";
function DropDownLink({ children, handleClick, to, type }) {
  if (type === "button")
    return (
      <button className={styledDropDownLink} to={to}>
        {children}
      </button>
    );
  else
    return (
      <Link onClick={handleClick} className={styledDropDownLink} to={to}>
        {children}
      </Link>
    );
}

export default DropDownLink;
