import { IoInformationCircle } from "react-icons/io5";

function EmptyItemsMessage({ children }) {
  return (
    <div className="mx-3 mt-3 space-y-2 rounded border border-blue-300 bg-blue-50 p-2 py-3 text-center xl:m-0">
      <div className="mx-auto w-10 rounded-full ">
        <IoInformationCircle size={30} className="text-cyan-500" />
      </div>
      <p className=" text-blue-800">{children}</p>
    </div>
  );
}

export default EmptyItemsMessage;
