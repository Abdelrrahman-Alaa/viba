"use client";

import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { State, StoreDispatch } from "./_redux/store";
import { useEffect } from "react";
import { getPosts } from "./_redux/postSlice";
import Loading from "./loading";
import { Box } from "@mui/material";
import PostComponent from "./components/PostComponent/PostComponent";

export default function Home() {
  const { isLoading, posts } = useSelector((state: State) => state.postsReducer);
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <ProtectedRoute>
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ margin: "1rem" }}>
          {posts?.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </Box>
      )}
    </ProtectedRoute>
  );
}
