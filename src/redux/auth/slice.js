import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isRefreshing: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setlogOut: (state, action) => {
      state.user = { name: null, email: null };
      state.token = null;
    },
    refreshUser: (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
      },
  },
});

export const { setToken, setlogOut, refreshUser } = authReducer.actions;
export default authReducer.reducer;