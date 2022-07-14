import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Layout,
  NotFound,
} from "./components";
import { StateContext } from "./context/StateContext";
import { UserProvider } from "./context/UserContext";
import {
  AddProduct,
  Cancel,
  Home,
  Login,
  ProductDetails,
  ProductsList,
  Success,
} from "./pages";

import AdminRoute from "./routeGuard/AdminRoute"

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await products.list();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  });
  return (
    <div>
      <StateContext>
        <Layout>
          <UserProvider>
          <Toaster />

            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route element={<AdminRoute />}>
                <Route path="addproduct" element={<AddProduct />} />
              </Route>
  
              <Route path="login" element={<Login />} />
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

          </UserProvider>
        </Layout>
      </StateContext>
    </div>
  );
}

export default App;