"use client";

import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { setError, setLoading, setToken } from "../_redux/authSlice";
import { DatePicker } from "@mui/x-date-pickers";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import WcIcon from "@mui/icons-material/Wc";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((store: State) => store.authReducer.loading);
  const [showError, setShowError] = React.useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Select a valid gender")
      .required("Gender is required"),
  });

  async function register(values: any) {
    dispatch(setLoading());
    try {
      const res = await fetch(
        `https://linked-posts.routemisr.com/users/signup`,
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
        router.push("/login");
        resetForm();
      } else {
        dispatch(setError(data.error));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setTouched,
    resetForm,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: null,
      gender: "",
    },
    validationSchema,
    onSubmit: register,
  });

  React.useEffect(() => {
    if (isLoading === false && Object.keys(errors).length > 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }, [isLoading, errors]);

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
              Registration failed. Please check your input.
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
              onBlur={handleBlur}
              value={values.name}
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
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
              onBlur={handleBlur}
              value={values.password}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rePassword}
              id="rePassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              error={touched.rePassword && Boolean(errors.rePassword)}
              helperText={touched.rePassword && errors.rePassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DatePicker
              label="Date of birth"
              value={values.dateOfBirth}
              onChange={(value) => {
                setFieldValue("dateOfBirth", value);
              }}
              onClose={() => setTouched({ dateOfBirth: true }, true)}
              slotProps={{
                textField: {
                  error: touched.dateOfBirth && Boolean(errors.dateOfBirth),
                  helperText: touched.dateOfBirth && errors.dateOfBirth,
                },
              }}
            />

            <FormControl
              fullWidth
              error={touched.gender && Boolean(errors.gender)}
            >
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={values.gender}
                label="Gender"
                onChange={(e) => setFieldValue("gender", e.target.value)}
                onBlur={() => setTouched({ gender: true }, true)}
                startAdornment={
                  <InputAdornment position="start">
                    <WcIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
              {touched.gender && errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>

            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress size="30px" /> : "Register"}
            </Button>
          </form>
        </Paper>
      </div>
    </Fade>
  );
}
