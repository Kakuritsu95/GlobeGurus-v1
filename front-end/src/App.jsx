import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { APP_ROUTES } from "../constants/Routes";
import EditGuide from "./pages/EditGuide";
import AppLayout from "./ui/AppLayout";
import UserGuides from "./pages/UserGuides";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserSettings from "./pages/UserSettings";
import Explore from "./pages/Explore";
import FeedGuides from "./features/guides/FeedGuides";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./helpers/ProtectedRoute";
import BookmarkedGuides from "./pages/BookmarkedPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
    refetchOnWindowsFocus: false,
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
            <Route index element={<Homepage />} />

            <Route
              path={`${APP_ROUTES.GUIDE_EDIT}/:guideId`}
              element={<EditGuide />}
            />
            <Route
              path={`${APP_ROUTES.USER_SETTINGS}/:userId`}
              element={<ProtectedRoute />}
            >
              <Route index element={<UserSettings />} />
            </Route>
            <Route
              path={`${APP_ROUTES.GUIDE_VIEW}/:guideId`}
              element={<EditGuide />}
            />
            <Route
              path={`${APP_ROUTES.GUIDES_PAGE}/:userId`}
              element={<UserGuides />}
            />
            <Route
              path={APP_ROUTES.BOOKMARKED_PAGE}
              element={<BookmarkedGuides />}
            />
            <Route path={APP_ROUTES.SIGN_UP} element={<Signup />} />
            <Route path={APP_ROUTES.LOGIN} element={<Login />} />
            <Route path={APP_ROUTES.EXPLORE} element={<Explore />}>
              <Route path={":service"} element={<FeedGuides />} />
            </Route>
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
