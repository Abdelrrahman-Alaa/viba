import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const initialState = {
  token,
  loading: false as boolean,
  error: null as null | string,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setToken: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.success(action.payload.message);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Incorrect email or password");
    },
  },
});

export const authReducer = authSlice.reducer;

export const { removeToken, setError, setLoading, setToken } =
  authSlice.actions;
