import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { initializeUser } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { userService } from "../../services/services";
import Button from "../../ui/Button";
import FormInputField from "../../ui/FormInputField";
import Message from "../../ui/Message";
function LoginForm() {
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm();

  async function onSubmit(data) {
    try {
      const userData = await userService.login(data);

      if (errorMessage) {
        setErrorMessage(errorMessage);
      }
      if (userData) {
        setErrorMessage("");
        dispatch(initializeUser(userData));
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  if (isSubmitSuccessful && !errorMessage)
    return <Navigate to="/" replace={true} />;

  return (
    <form
      className="w-full space-y-6 text-sm md:text-base"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && <Message isSuccess={false}>{errorMessage}</Message>}
      <FormInputField
        labelName="email"
        register={register}
        error={errors?.email}
        validationRules={{
          required: { value: true, message: `Email is required` },
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
          },
        }}
      />
      <FormInputField
        labelName="password"
        register={register}
        error={errors?.password}
        validationRules={{
          required: { value: true, message: `Password is required` },
          minLength: {
            value: 5,
            message: "Password must contain more than 5 characters",
          },
        }}
      />
      <Button disabled={isSubmitting || !isValid}>Login</Button>
      <div className="my-3 font-light text-zinc-300 md:my-5">
        <span> Not registered yet? </span>
        <Link
          to="/signup"
          className="font-semibold text-blue-500 underline hover:text-blue-600"
        >
          Signup now!
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
