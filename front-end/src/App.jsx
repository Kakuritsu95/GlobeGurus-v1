import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditGuide from "./pages/EditGuide";
import AppLayout from "./ui/AppLayout";
import NearbyPlacesProvider from "./features/places/NearbyPlacesProvider";
import UserGuides from "./pages/UserGuides";
import { APP_ROUTES } from "../constants/apiRoutes";

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
          <Route path={APP_ROUTES.GUIDES_PAGE} element={<UserGuides />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
