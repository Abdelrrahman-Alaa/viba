"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  IconButtonProps,
  styled,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { Post } from "@/app/interfaces";
import Link from "next/link";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostComponent({
  post,
  isSinglePost = false,
}: {
  post: Post;
  isSinglePost?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };

  const [expanded, setExpanded] = useState(isSinglePost);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date(post.createdAt).toLocaleString());
  }, [post.createdAt]);

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mb: 2 }} elevation={3}>
      <CardHeader
        avatar={<Avatar alt="User avatar" src={post.user?.photo} />}
        title={post.user?.name}
        subheader={formattedDate}
      />

      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post.body}
        </Typography>
      </CardContent>

      {post.image && (
        <CardMedia component="img" image={post.image} alt="Post image" />
      )}

      <CardActions
        sx={{
          width: "80%",
          display: "flex",
          mx: "auto",
          justifyContent: "space-between",
        }}
      >
        <IconButton aria-label="like" onClick={handleLike}>
          <FavoriteIcon color={liked ? "error" : "action"} />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ChatBubbleOutlineIcon />
          </ExpandMore>

          <Box>
            <Typography variant="body2" color="text.secondary">
              {post.comments.length}
            </Typography>
          </Box>
        </Box>

        <IconButton aria-label="share">
          <ShareIcon color={"action"} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {post.comments.length > 0 && isSinglePost == false ? (
          <CardContent sx={{ my: 1, backgroundColor: "#eee" }}>
            {post.comments.slice(0, 3).map((comment, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <CardHeader
                  avatar={<Avatar src={comment.commentCreator.photo} />}
                  title={comment.commentCreator.name}
                  subheader={formattedDate}
                />
                <Typography>{comment.content}</Typography>
              </Box>
            ))}

            <Box textAlign="center">
              <Link
                href={`/single-post/${post.id}`}
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View all comments →
              </Link>
            </Box>
          </CardContent>
        ) : post.comments.length > 0 && isSinglePost ? (
          <CardContent sx={{ my: 1, backgroundColor: "#eee" }}>
            {post.comments.map((comment, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <CardHeader
                  avatar={<Avatar src={comment.commentCreator.photo} />}
                  title={comment.commentCreator.name}
                  subheader={formattedDate}
                />
                <Typography>{comment.content}</Typography>
              </Box>
            ))}
          </CardContent>
        ) : (
          ""
        )}
      </Collapse>
    </Card>
  );
}
