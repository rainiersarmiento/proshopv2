import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Injecting endpoints to endpoints in apiSlice
// builder has a ton of methods i.e. a query method
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      // USES RTK QUERY UNDER THE HOOD
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// notice the 'Query' at the end of the getProducts
// Add prefixes depending on the function type
// if mutation - then add mutation
export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;
