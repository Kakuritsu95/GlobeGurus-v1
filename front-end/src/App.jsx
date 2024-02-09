import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>main</div>}></Route>
          <Route path="/guides" element={<div>guides</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
