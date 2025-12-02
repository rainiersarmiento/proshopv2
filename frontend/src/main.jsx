import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import { ReactDOM } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";

// Creates a route using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    // App.js becomes your Layout
    <Route path="/" element={<App />}>
      {/* index = true - Only shows the HomeScreen - May show a big if there's an issue. */}
      <Route index={true} path="/" element={<HomeScreen />} />
      {/* NOTE: No index={true} because it is not the homepage */}
      <Route path="/product/:id" element={<ProductScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
