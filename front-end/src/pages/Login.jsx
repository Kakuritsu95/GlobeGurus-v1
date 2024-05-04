import LoginForm from "../features/users/LoginForm";

function Login() {
  return (
    <div className="pt-20">
      <div className="mx-5 rounded border-2 border-zinc-800 bg-slate-800 p-12 shadow-2xl sm:mx-auto sm:w-1/2 xl:w-3/12">
        <h4 className="mb-10 text-center text-xl font-semibold text-zinc-200">
          Login
        </h4>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
