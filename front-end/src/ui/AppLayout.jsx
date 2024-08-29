import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/services";
import { useDispatch } from "react-redux";
import { initializeUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import { useEffect } from "react";
function AppLayout() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.status);
  useEffect(() => {
    async function fetchUser() {
      const user = await userService.getUserDetails();

      dispatch(initializeUser(user));
    }
    fetchUser();
  }, []);

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      {isLoading && <Spinner />}
      <main id="main" className="relative overflow-y-hidden">
        {<Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
