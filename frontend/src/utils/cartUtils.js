export const addDecimals = (num) => {
  // Calculate the decimals to 2 places
  return Math.round((num * 100) / 100).toFixed(2);
};

// Calculate items price
export const updateCart = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  // reduce is a high order array method - not redux
  // start with the accumulator
  // add all the items and their quantities

  // Calculate shipping price ($10 on orders < 100 otherwise free)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // Calculate tax price (15% tax)
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
