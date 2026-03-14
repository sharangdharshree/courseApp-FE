import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.authChecked = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.authChecked = true;
    },
    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },
});

export const { login, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
