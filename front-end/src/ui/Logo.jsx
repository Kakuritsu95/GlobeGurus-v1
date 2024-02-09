import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link className="flex items-center space-x-3 rtl:space-x-reverse" to="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="GlobalGurus Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Global Gurus
      </span>
    </Link>
  );
}

export default Logo;
