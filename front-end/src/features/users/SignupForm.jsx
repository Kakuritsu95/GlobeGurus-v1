import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import FormInputField from "../../ui/FormInputField";
import { useForm } from "react-hook-form";
import { userService } from "../../services/services";
import Message from "../../ui/Message";
function SignupForm() {
  const [response, setResponse] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await userService.signup(data);
      setResponse({ isSuccess: true, message: response.message });
    } catch (error) {
      setResponse({ isSuccess: false, message: error.response.data.message });
    }
  }

  return (
    <form
      className="w-full space-y-6 text-sm md:text-base"
      onSubmit={handleSubmit(onSubmit)}
    >
      {response?.message && (
        <Message isSuccess={response.isSuccess}>{response.message}</Message>
      )}
      <FormInputField
        labelName="username"
        register={register}
        error={errors?.username}
        disabled={isSubmitting}
        validationRules={{
          required: { value: true, message: `username is required` },
        }}
      />
      <FormInputField
        labelName="email"
        register={register}
        error={errors?.email}
        disabled={isSubmitting}
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
        disabled={isSubmitting}
        validationRules={{
          required: { value: true, message: `Password is required` },
          minLength: {
            value: 5,
            message: "Password must contain more than 5 characters",
          },
        }}
      />
      <Button disabled={isSubmitting || (!isValid && isSubmitted)}>
        Register new account
      </Button>
      <div className="my-3 font-light text-zinc-300 md:my-5">
        <span> Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold text-blue-500 underline hover:text-blue-600"
        >
          Login now
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
