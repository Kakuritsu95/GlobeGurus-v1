function Message({ isSuccess, children }) {
  return (
    <h5
      className={`mx-auto w-72 rounded py-2 text-center font-medium ${isSuccess ? "bg-green-300" : "bg-red-300"}`}
    >
      {children}
    </h5>
  );
}

export default Message;
