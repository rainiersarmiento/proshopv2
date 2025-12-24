import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";

// Creates a route using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    // App.js becomes your Layout
    <Route path="/" element={<App />}>
      {/* index = true - Only shows the HomeScreen - May show a big if there's an issue. */}
      <Route index={true} element={<HomeScreen />} />
      {/* NOTE: No index={true} because it is not the homepage */}
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux Provider */}
    <Provider store={store}>
      {/* PayPal Provider encapsulates React Router */}
      <PayPalScriptProvider deferLoading={true}>
        {/* React Router Provider */}
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
