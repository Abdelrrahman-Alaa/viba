"use client";

import React, { useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { State, StoreDispatch } from "../_redux/store";
import { getUserPosts } from "../_redux/postSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Loading from "../loading";
import { Box } from "@mui/material";
import PostComponent from "../components/PostComponent/PostComponent";

export default function Profile() {
  interface MyJwtPayload {
    user: string;
    iat: number;
  }

  const { token } = useSelector((state: State) => state.authReducer);
  const { isLoading, posts } = useSelector(
    (state: State) => state.postsReducer
  );
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    const { user } = jwtDecode<MyJwtPayload>(`${token}`);
    dispatch(getUserPosts(user));
  }, []);

  const destructedPosts = [...posts];

  return (
    <ProtectedRoute>
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ margin: "1rem" }}>
          {destructedPosts?.reverse().map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </Box>
      )}{" "}
    </ProtectedRoute>
  );
}
