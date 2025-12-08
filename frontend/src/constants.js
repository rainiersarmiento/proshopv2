//export const BASE_URL =
//  process.env.NODE_ENV === "development" ? "htttp://localhost:8000" : "";
// Because Vite is special needs, use import.meta.env.NODE_ENV

export const BASE_URL =
  import.meta.env.NODE_ENV === "development" ? "http://localhost:8000" : "";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
