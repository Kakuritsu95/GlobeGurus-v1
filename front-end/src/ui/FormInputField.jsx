function FormInputField({ labelName, validation, register, error, disabled }) {
  const labelNameCapital = labelName[0].toUpperCase() + labelName.slice(1);
  console.log(validation);
  return (
    <div>
      <label
        htmlFor={labelName}
        className="mb-2 block  font-medium text-zinc-200"
      >
        {labelNameCapital}
      </label>
      {error && (
        <span className="mb-2 block text-sm font-thin text-red-500">
          {error?.message}
        </span>
      )}
      <input
        id={labelName}
        disabled={disabled}
        className={`block w-full rounded-lg border  border-gray-300 ${disabled ? "bg-gray-300" : "bg-gray-50"} p-2.5  text-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        {...register(labelName, {
          ...validation,
        })}
      />
    </div>
  );
}
export default FormInputField;
