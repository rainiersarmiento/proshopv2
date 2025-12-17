/**
 * Whats the difference between this slice and the apiSlice?
 * API slice makes async calls to an API
 * cart won't request data from an api so it wont need the
 * 'createApi' function from redux
 */
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? // Check to see if "cart" exists in localStorage
    JSON.parse(localStorage.getItem("cart"))
  : // else create an object with key/value cartItems : array
    { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
// Items are going to be stored in localStorage

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
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const item_id = action.payload;
      // state.cartItems = state.cartItems.filter is not the same as state.cartItems alone
      // Remember that you need to reset the value of state using an equals sign
      // will not automatically mutate the state.
      state.cartItems = state.cartItems.filter((x) => x._id !== item_id);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;
// To use in your app, you still need to export it as an action

export default cartSlice.reducer;
