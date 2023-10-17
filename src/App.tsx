// import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductPage from './pages/ProductPage' 
// import { AuthContext } from "./context/AuthContext";

function App() {
  // const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/categories" element={<Navigate to="/categories" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/categories"
          element={
            isAuthenticated ? <CategoriesPage /> : <Navigate to="/login" />
          }
        /> */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
