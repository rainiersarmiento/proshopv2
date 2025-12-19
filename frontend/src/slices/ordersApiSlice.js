import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

/**
 somethingApiSlice = apiSlice.injectEndpoints 
 
 */
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createOrder - remember query is payload details
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        // method: "GET" - GET is used by default
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetOrderQuery,
} = ordersApiSlice;
