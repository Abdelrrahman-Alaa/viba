import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducer } from "./postSlice";

export let store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});

export type State = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
