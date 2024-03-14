function FormInputField({
  labelName,
  labelColor = "text-zinc-200",
  validationRules,
  register,
  error,
}) {
  const labelNameCapital = labelName[0].toUpperCase() + labelName.slice(1);

  return (
    <div>
      <label
        htmlFor={labelName}
        className={`mb-2 block font-medium ${labelColor}`}
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
        className={`block w-full rounded-lg border  border-gray-300 p-2.5  text-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        {...register(labelName, {
          ...validationRules,
        })}
      />
    </div>
  );
}
export default FormInputField;
