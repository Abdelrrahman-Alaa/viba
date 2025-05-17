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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { State, StoreDispatch } from "@/app/_redux/store";
import { deletePost } from "@/app/_redux/postSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface MyJwtPayload {
  user: string;
  iat: number;
}

export default function PostComponent({
  post,
  isSinglePost = false,
}: {
  post: Post;
  isSinglePost?: boolean;
}) {
  const { token } = useSelector((state: State) => state.authReducer);
  const { user } = jwtDecode<MyJwtPayload>(`${token}`);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  const dispatch = useDispatch<StoreDispatch>();

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (postId: string) => {
    setPostIdToDelete(postId);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      dispatch(deletePost(postIdToDelete));
    }
    setOpenConfirm(false);
    setPostIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setPostIdToDelete(null);
  };

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
        action={
          <IconButton aria-label="settings" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      {post.user?._id === user && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleDeleteClick(post.id);
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      )}
      <Dialog
        open={openConfirm}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
