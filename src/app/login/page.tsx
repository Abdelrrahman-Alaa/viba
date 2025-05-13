"use client";

import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { setError, setloading, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  let router = useRouter();
  let dispatch = useDispatch();
  let isLoading = useSelector((store: State) => store.authReducer.loading);

  async function login(values: { email: string; password: string }) {
    dispatch(setloading());
    try {
      let res = await fetch(`https://linked-posts.routemisr.com/users/signin`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      });

      let data = await res.json();

      if (res.ok) {
        router.push("/");
        dispatch(setToken(data));
        resetForm();
      } else {
        dispatch(setError(data.error));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  let { handleSubmit, handleChange, resetForm, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
  });
  return (
    <>
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
          />
          <TextField
            onChange={handleChange}
            value={values.password}
            id="password"
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size="30px" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </>
  );
}
