import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

let initialState = {
  isLoading: false as Boolean,
  posts: [] as Post[],
  error: null as any,
};

export let getPosts = createAsyncThunk("posts/getPosts", async () => {
  let response = await fetch(
    "https://linked-posts.routemisr.com/posts?limit=80",
    {
      method: "GET",
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  console.log(data);

  return data;
});

let postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export let postsReducer = postSlice.reducer;
