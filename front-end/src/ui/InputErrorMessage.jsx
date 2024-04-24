function InputErrorMessage({ children }) {
  return (
    <span className="mb-2 block text-sm font-thin text-red-500">
      {children}
    </span>
  );
}

export default InputErrorMessage;
