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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

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
  const [tab, setTab] = React.useState(0);

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
          {/* User Info Card */}
          <Card sx={{ mb: 3, p: 2, borderRadius: 3 }}>
            <CardHeader
              avatar={<Avatar sx={{ width: 56, height: 56 }} />}
              title={<Typography variant="h6">User Profile</Typography>}
              subheader={
                <Typography variant="body2">
                  Welcome to your profile!
                </Typography>
              }
            />
          </Card>
          {/* Tabs for Posts, Comments, Settings */}
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Posts" />
            <Tab label="Comments" />
            <Tab label="Settings" />
          </Tabs>
          {tab === 0 &&
            destructedPosts
              ?.reverse()
              .map((post) => <PostComponent key={post._id} post={post} />)}
          {tab === 1 && (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          )}
          {tab === 2 && (
            <Typography variant="body2" color="text.secondary">
              Settings coming soon.
            </Typography>
          )}
        </Box>
      )}{" "}
    </ProtectedRoute>
  );
}
