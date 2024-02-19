import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function AppLayout() {
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
