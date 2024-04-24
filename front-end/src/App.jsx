import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { APP_ROUTES } from "../constants/ROUTES";
import EditGuide from "./pages/EditGuide";
import AppLayout from "./ui/AppLayout";
import UserGuides from "./pages/UserGuides";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserSettings from "./pages/UserSettings";
import Explore from "./pages/Explore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
queryClient.setQueryDefaults(["guides"], { staleTime: Infinity });
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" />
            <Route
              path={`${APP_ROUTES.GUIDE_EDIT}/:guideId`}
              element={<EditGuide isEditSession={true} />}
            />
            <Route
              path={`${APP_ROUTES.GUIDE_VIEW}/:guideId`}
              element={<EditGuide isEditSession={true} />}
            />
            <Route path={APP_ROUTES.GUIDES_PAGE} element={<UserGuides />} />
            <Route path={APP_ROUTES.SIGN_UP} element={<Signup />} />
            <Route path={APP_ROUTES.LOGIN} element={<Login />} />
            <Route path={APP_ROUTES.USER_SETTINGS} element={<UserSettings />} />
            <Route path={APP_ROUTES.EXPLORE} element={<Explore />} />
          </Route>
        </Routes>
        <Toaster
          toastOptions={{
            style: {
              padding: "16px",
              color: "black",
              fontSize: "1rem",
              fontWeight: "500",
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
