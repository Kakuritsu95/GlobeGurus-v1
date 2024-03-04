import SignupForm from "../features/users/SignupForm";
function Signup() {
  return (
    <div className="pt-20">
      <div className="mx-5 rounded border-2 border-zinc-800 bg-slate-800 p-12 shadow-2xl sm:mx-auto sm:w-1/2 sm:py-12 lg:w-3/12">
        <h4 className="mb-10 text-center text-xl font-semibold text-zinc-200">
          Sign up!
        </h4>
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
