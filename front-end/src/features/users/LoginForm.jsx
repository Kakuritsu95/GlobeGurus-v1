import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function LoginForm() {
  return (
    <form className="w-full space-y-6 text-sm md:text-base">
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
      <div className="my-20">
        <Button type="brand">Login</Button>
      </div>
      <div className="font-light text-zinc-300 md:my-5">
        <span> Not registered yet? </span>
        <Link
          to="/signup"
          className="font-semibold text-blue-500 underline hover:text-blue-600"
        >
          Signup Now!
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
