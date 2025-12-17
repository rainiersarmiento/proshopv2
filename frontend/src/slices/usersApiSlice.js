import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

/**
 * Login is considered a mutation in frontend
 * because it's an action that changes state on the server—it creates a session,
 * updates user data (like lastLogin), and issues tokens
 */

// Injecting endpoints to endpoints in apiSlice
// builder has a ton of methods i.e. a query method
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // query fetches data - we need a mutation
      // data contains email & password to login
      // Consider query as request configuration NOT fetch data
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

// notice the 'Query' at the end of the getProducts
// Add prefixes depending on the function type
// if mutation - then add mutation
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  usersApiSlice;
