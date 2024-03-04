import { NavLink } from "react-router-dom";
function NavLinkItem({ children, to }) {
  return (
    <NavLink
      className="block w-full rounded px-3 py-2 text-lg text-zinc-700  hover:bg-zinc-200  hover:text-blue-600 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default NavLinkItem;
