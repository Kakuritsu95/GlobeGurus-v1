import { Link } from "react-router-dom";

function Button({ children, type, disabled, onClick, to }) {
  const types = {
    default:
      "bg-slate-700 px-3 py-2 rounded-full md:px-4 md:pr-5 hover:bg-slate-600 text-sm w-22 md:text-base w-24 focus:bg-slate-500",
    primary:
      "px-5 py-2.5 focus:ring-4 focus:ring-blue-300 rounded hover:bg-blue-800 focus:outline-none sm:w-auto md:text-base bg-blue-700",
    brand:
      "text-base py-2.5 w-full focus:ring-4 focus:bg-blue-700 focus:ring-blue-300 rounded hover:bg-blue-800 focus:outline-none bg-blue-700 md:w-24 md:rounded-full",
  };
  {
    return to ? (
      <Link
        type="submit"
        className={`text-center font-medium text-white ${types[type]}`}
        to={to}
        disabled={disabled}
      >
        {children}
      </Link>
    ) : (
      <button
        type="submit"
        className={`text-center font-medium text-white ${types[type]}`}
        onClick={onClick}
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
