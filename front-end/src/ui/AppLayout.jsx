import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../services/userServices";
import { useDispatch } from "react-redux";
import { initializeUser } from "../features/users/userSlice";
import Navbar from "./Navbar";
import { useEffect } from "react";
function AppLayout() {
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: verifyUser,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.id) dispatch(initializeUser(user));
  }, [user, dispatch]);
  return (
    <>
      <Navbar />
      <main id="main" className="relative min-h-[80dvh]">
        {<Outlet />}
      </main>
    </>
  );
}

export default AppLayout;
