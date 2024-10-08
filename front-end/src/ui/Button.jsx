import { Link } from "react-router-dom";

function Button({ children, type, disabled, handleClick, to, bgColor }) {
  const types = {
    default:
      "bg-slate-700 px-3 py-2 text-white rounded-full md:px-4 md:pr-5 hover:bg-slate-600 text-sm w-22 md:text-base w-24 focus:bg-slate-500",
    primary:
      "px-3 py-2.5 focus:ring-4 focus:ring-blue-300 text-white rounded hover:bg-blue-800 focus:outline-none sm:w-auto md:text-base bg-blue-700",
    brand:
      "text-base py-2.5 w-full text-white focus:ring-4 focus:bg-blue-700 focus:ring-blue-300 rounded hover:bg-blue-800 focus:outline-none bg-blue-700 md:w-24 md:rounded-full",
    landingButton: `rounded-3xl sm:px-3 sm:text-sm sm:py-3 px-4 py-2 text-xs lg:px-5 lg:py-3 lg:text-base 2xl:px-9 2xl:py-3.5 transition-all font-semibold duration-300 ${bgColor}`,
    danger:
      "rounded-full bg-red-600 px-3 py-2 text-center text-sm font-medium text-gray-100 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300",
    cancel:
      "rounded-full border border-gray-200 bg-blue-400 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-300 focus:z-10",
    panelEnabled:
      "rounded-full text-white border border-gray-200 bg-blue-500 px-3 py-2 text-sm font-medium hover:bg-blue-400 focus:z-10",
    panelDisabled:
      "rounded-full text-gray-700 border border-gray-200 bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300 focus:z-10",
  };
  {
    return to ? (
      <Link
        type="submit"
        className={`text-center font-medium ${types[type]}`}
        to={to}
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </Link>
    ) : (
      <button
        type="submit"
        className={`text-center font-medium ${disabled && "cursor-not-allowed bg-zinc-400 text-gray-800 hover:bg-zinc-400"} ${types[type]}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
Button.defaultProps = {
  type: "primary",
};

export default Button;
