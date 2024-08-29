import { Link } from "react-router-dom";
import { FaGlobeAsia } from "react-icons/fa";

function Logo() {
  return (
    <Link className="flex items-center space-x-3 rtl:space-x-reverse" to="/">
      <div className="flex items-center text-2xl font-semibold text-gray-700 ">
        <span>Gl</span>
        <FaGlobeAsia className="mx-[0.5px] text-blue-500" size={21} />
        <span>be</span>
        <img src="/public/images/logo.png" className="mx-1 h-14" alt="Logo" />
        <span>Gurus</span>
      </div>
    </Link>
  );
}

export default Logo;
