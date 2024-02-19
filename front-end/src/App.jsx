import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditGuide from "./pages/EditGuide";
import AppLayout from "./ui/AppLayout";
import NearbyPlacesProvider from "./features/nearby-places/NearbyPlacesProvider";
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
          <Route path="/guides" element={<div>guides</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
