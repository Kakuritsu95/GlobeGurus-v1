function ImageTitleLayout({ children }) {
  return (
    <div className="shadow-inner-2xl absolute right-0 top-0 h-full w-full">
      <h4 className="absolute left-3 top-1 text-lg  font-semibold text-gray-50">
        {children}
      </h4>
    </div>
  );
}

export default ImageTitleLayout;
