import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../services/userServices";
import { useDispatch } from "react-redux";
import { initializeUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import { useEffect } from "react";
function AppLayout() {
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: verifyUser,
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.status);
  useEffect(() => {
    if (user?.id) dispatch(initializeUser(user));
  }, [user, dispatch]);

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      {isLoading && <Spinner />}
      <main id="main" className="relative h-full overflow-hidden">
        {<Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
