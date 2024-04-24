import { useSelector } from "react-redux";

function GuideActionButton({ handleClick, isSubmitting, children }) {
  const userId = useSelector((store) => store.user.id);
  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-center space-x-2 rounded px-5  py-1  hover:bg-gray-300 hover:text-black ${!userId && "cursor-not-allowed"}`}
      disabled={isSubmitting || !userId}
    >
      {children}
    </button>
  );
}

export default GuideActionButton;
