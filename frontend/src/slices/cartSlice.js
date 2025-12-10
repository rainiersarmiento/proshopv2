/**
 * Whats the difference between this slice and the apiSlice?
 * API slice makes async calls to an API
 * cart won't request data from an api so it wont need the
 * 'createApi' function from redux
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? // Check to see if "cart" exists in localStorage
    JSON.parse(localStorage.getItem("cart"))
  : // else create an object with key/value cartItems : array
    { cartItems: [] };
// Items are going to be stored in localStorage

const addDecimals = (num) => {
  // Calculate the correct decimals
  return Math.round((num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  /**
   * A function that accepts an initial state, an object full of reducer functions, and a "slice name",
   */
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state = current state of the cart
      // action = the payload that will alter the state
      // - add/remove from existing cart
      const item = action.payload;
      // action.payload - how to retrieve the change
      const existItem = state.cartItems.find((x) => x._id === item._id);
      // check to see if the item is already in the cart by finding it within the current state's cartItems
      // Remember {cartItems : []}?

      if (existItem) {
        // if it already exists, map through the items
        // if the id and the existItem id are the same then return the item
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // add the item to the cart items
        // redux uses Immer and this you need to use the spread operator
        // state is an immutable object so no push
        // but you can add properties to the current state bc immer handles it under the hood
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      // reduce is a high order array method - not redux
      // start with the accumulator
      // add all the items and their quantities

      // Calculate shipping price ($10 on orders < 100 otherwise free)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      console.log(state.shippingPrice);
      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(0.15 * state.itemsPrice);

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
// To use in your app, you still need to export it as an action

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// import React from "react";
// const initialState = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : { cartItems: [] };
// const cartSlice = createSlice({
//   /**PARAMS
//    * name
//    * initialState - An initial state
//    * reducers: {}
//    */
//   name: "cart",
//   initialState,
//   reducers: {},
// });

// export default cartSlice.reducer;
