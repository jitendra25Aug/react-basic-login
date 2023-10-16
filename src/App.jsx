import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SharedLayout, Error, Products, ProtectedRoute } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;