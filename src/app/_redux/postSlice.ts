import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

const initialState = {
  isLoading: false as boolean,
  posts: [] as Post[],
  post: null as null,
  error: null as any,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await fetch(
    "https://linked-posts.routemisr.com/posts?limit=80",
    {
      method: "GET",
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
});

export const getPost = createAsyncThunk("posts/getPost", async (id: string) => {
  const response = await fetch(
    `https://linked-posts.routemisr.com/posts/${id}`,
    {
      method: "GET",
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
});

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId: string) => {
    const response = await fetch(
      `https://linked-posts.routemisr.com/users/${userId}/posts`,
      {
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    const response = await fetch(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  }
);

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

const postSlice = createSlice({
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

    // Get user posts
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete user post
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
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
      if (action.payload.post) {
        state.posts = [action.payload.post, ...state.posts];
      }
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const postsReducer = postSlice.reducer;
