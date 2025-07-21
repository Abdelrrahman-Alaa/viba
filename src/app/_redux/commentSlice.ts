import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../interfaces";

const initialState = {
  isLoading: false as boolean,
  comments: [] as Comment[],
  comment: null as null,
  error: null as any,
};

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData: { content: string; post: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://linked-posts.routemisr.com/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token || "",
          },
          body: JSON.stringify(commentData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: string) => {
    console.log("Token before delete:", localStorage.getItem("token"));
    console.log("Comment ID:", commentId);
    const response = await fetch(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
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

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      if (Array.isArray(action.payload.comments)) {
        state.comments = action.payload.comments;
      } else if (action.payload.comment) {
        state.comments.push(action.payload.comment);
      }
    });

    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete user post
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.meta.arg
      );
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const commentsReducer = commentSlice.reducer;
