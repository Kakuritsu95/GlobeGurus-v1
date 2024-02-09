import { NavLink } from "react-router-dom";
function NavLinkItem({ children, to }) {
  return (
    <NavLink
      className="block py-2 px-3 text-lg text-zinc-700 hover:text-blue-700  md:hover:bg-transparent  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent"
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default NavLinkItem;
