function ImageTitleLayout({ children }) {
  return (
    <div className="absolute right-0 top-0 h-full w-full shadow-inner-2xl">
      <h4 className="absolute left-3 top-1 text-lg  font-semibold text-gray-50">
        {children}
      </h4>
    </div>
  );
}

export default ImageTitleLayout;
