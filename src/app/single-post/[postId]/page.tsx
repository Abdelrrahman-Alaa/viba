"use client";

import { getPost } from "@/app/_redux/postSlice";
import { State, StoreDispatch } from "@/app/_redux/store";
import PostComponent from "@/app/components/PostComponent/PostComponent";
import Loading from "@/app/loading";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Post() {
  const { isLoading, post } = useSelector((store: State) => store.postsReducer);
  const dispatch = useDispatch<StoreDispatch>();
  const { postId } = useParams();
  useEffect(() => {
    dispatch(getPost(`${postId}`));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        post && (
          <Box sx={{ margin: "1rem" }}>
            {" "}
            <PostComponent post={post} isSinglePost={true} />
          </Box>
        )
      )}
    </>
  );
}
