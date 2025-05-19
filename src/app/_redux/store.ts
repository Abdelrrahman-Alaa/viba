import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducer } from "./postSlice";
import { commentsReducer } from "./commentSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
    commentsReducer,
  },
});

export type State = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
