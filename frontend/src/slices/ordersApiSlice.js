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
    getOrder: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery } =
  ordersApiSlice;
