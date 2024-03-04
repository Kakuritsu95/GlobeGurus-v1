import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditGuide from "./pages/EditGuide";
import AppLayout from "./ui/AppLayout";
import NearbyPlacesProvider from "./features/places/NearbyPlacesProvider";
import UserGuides from "./pages/UserGuides";
import { APP_ROUTES } from "../constants/apiRoutes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <NearbyPlacesProvider>
                <EditGuide>main</EditGuide>
              </NearbyPlacesProvider>
            }
          ></Route>
          <Route path={APP_ROUTES.GUIDES_PAGE} element={<UserGuides />} />
          <Route path={APP_ROUTES.SIGN_UP} element={<Signup />} />
          <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
