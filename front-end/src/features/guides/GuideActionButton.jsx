function GuideActionButton({ handleClick, isSubmitting, children }) {
  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center space-x-2 rounded px-5  py-1  hover:bg-gray-300 hover:text-black"
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
}

export default GuideActionButton;
