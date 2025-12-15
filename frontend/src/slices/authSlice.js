import { createSlice } from "@reduxjs/toolkit";
// Used to set user's credentials to local storage.
// Will handle clearing local storage when logging out.
const initialState = {
  // getItem gets the key's value and returns null otherwise
  userInfo: localStorage.getItem("userInfo")
    ? // set userInfo to the right data
      JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // action will contain the email and password
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // setItem(key, value)
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
