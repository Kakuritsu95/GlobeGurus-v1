import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditGuide from "./pages/EditGuide";
import AppLayout from "./ui/AppLayout";
import NearbyPlacesProvider from "./features/places/NearbyPlacesProvider";
import UserGuides from "./pages/UserGuides";
import { APP_ROUTES } from "../constants/ROUTES";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path={`${APP_ROUTES.GUIDE_EDIT}/:guideId`}
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
