"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Avatar,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useDispatch, useSelector } from "react-redux";
import { State, StoreDispatch } from "../_redux/store";
import { createPost } from "../_redux/postSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: State) => state.postsReducer.isLoading);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!text && !image) return;

    const formData = new FormData();
    formData.append("body", text);
    if (image) formData.append("image", image);

    dispatch(createPost(formData)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success(res.payload.message);
        router.push("/profile");
        setText("");
        setImage(null);
        setPreview(null);
      }
    });
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "block" },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      px={{ xs: 2, sm: 0 }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 500, md: 600 },
          mx: "auto",
          mt: { xs: 3, sm: 5 },
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
          mb: 5,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Create a Post
        </Typography>

        <TextField
          label="What's on your mind?"
          placeholder="Write something interesting..."
          multiline
          rows={4}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<ImageIcon />}
            component="label"
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {preview && (
            <Avatar
              variant="rounded"
              src={preview}
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                border: "2px solid #ccc",
              }}
            />
          )}
        </Stack>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 4, textTransform: "none", fontWeight: "bold" }}
          onClick={handlePost}
          disabled={(!text && !image) || isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Post"}
        </Button>
      </Paper>
    </Box>
  );
}
