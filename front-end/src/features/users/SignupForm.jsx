import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function SignupForm() {
  return (
    <form className="w-full space-y-6 text-sm md:text-base">
      <div>
        <label
          htmlFor="userName"
          className="mb-2 block  font-medium text-zinc-200"
        >
          User name
        </label>
        <input
          type="text"
          id="userName"
          className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-medium text-zinc-200">
          Email
        </label>
        <input
          type="email"
          id="email"
          className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:text-base"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block  font-medium text-zinc-200"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
            required
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2  font-medium text-zinc-200 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <Button>Register new account</Button>
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
