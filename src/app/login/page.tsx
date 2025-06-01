"use client";

import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { setError, setLoading, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((store: State) => store.authReducer.loading);
  const [showError, setShowError] = React.useState(false);

  async function login(values: { email: string; password: string }) {
    dispatch(setLoading());
    try {
      const res = await fetch(
        `https://linked-posts.routemisr.com/users/signin`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        dispatch(setToken(data));
        router.push("/");
        resetForm();
      } else {
        dispatch(setError(data.error));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const { handleSubmit, handleChange, resetForm, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
  });

  React.useEffect(() => {
    if (isLoading === false && values.email && values.password) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }, [isLoading]);

  return (
    <Fade in={true} timeout={600}>
      <div>
        <Paper
          elevation={5}
          sx={{
            p: 2,
            m: 3,
            width: {
              xs: "90%",
              sm: "70%",
              md: "50%",
              lg: "33%",
            },
            marginInline: "auto",
            marginBlock: 8,
          }}
        >
          {showError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Login failed. Please check your credentials.
            </Alert>
          )}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1rem",
            }}
          >
            <TextField
              onChange={handleChange}
              value={values.email}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={handleChange}
              value={values.password}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress size="30px" /> : "Login"}
            </Button>
          </form>
        </Paper>
      </div>
    </Fade>
  );
}
