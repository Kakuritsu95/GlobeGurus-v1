import InputErrorMessage from "./InputErrorMessage";
function FormInputField({
  labelName,
  labelColor = "text-zinc-200",
  validationRules,
  placeholder,
  register,
  errorMessage,
}) {
  const labelNameCapital = labelName[0].toUpperCase() + labelName.slice(1);

  return (
    <div>
      <div className="flex items-center gap-2">
        <label
          htmlFor={labelName}
          className={`mb-2 block font-medium ${labelColor}`}
        >
          {labelNameCapital}
        </label>
        {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
      <input
        id={labelName}
        placeholder={placeholder}
        className={`block w-full rounded-lg border  border-gray-300 p-2.5  text-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        {...register(labelName, {
          ...validationRules,
        })}
      />
    </div>
  );
}
export default FormInputField;
