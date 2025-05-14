import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

let initialState = {
  isLoading: false as boolean,
  posts: [] as Post[],
  post: null as null,
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

  return data;
});

export let getPost = createAsyncThunk("posts/getPost", async (id: String) => {
  let response = await fetch(`https://linked-posts.routemisr.com/posts/${id}`, {
    method: "GET",
    headers: {
      token: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();

  return data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://linked-posts.routemisr.com/posts", {
        method: "POST",
        headers: {
          token: token || "",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get posts
    builder.addCase(getPosts.pending, (state) => {
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

    // Get one post
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload.post;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create post
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export let postsReducer = postSlice.reducer;
