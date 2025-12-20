import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

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
    payOrder: builder.mutation({
      // orderId & detail are received from paypal
      // -> they need to be destructured
      // RTK Query calls query with only 1 parameter
      // Destructuring makes it possible to gather more than 1 args if necessary
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        // ...details is received from paypal
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        // 'api/paypal/config'
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = ordersApiSlice;
