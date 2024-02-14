import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80dvh]">{<Outlet />}</main>
    </>
  );
}

export default AppLayout;
