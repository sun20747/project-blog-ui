import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios.config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/store/session";
import router from "next/router";

const theme = createTheme();

export default function SignInSide() {
  // console.log({
  //   email: event.email,
  //   password: event.password,
  // });
  const dispatch = useDispatch();
  const submit = async (event) => {
    const body = JSON.stringify({
      admin: {
        email: event.email.toLowerCase(),
        password: event.password,
      },
    });
    // console.log(event.email);
    await axios
      .post("/api/v1/admin/sign_in", body)
      .then((res) => {
        // console.log(res.data.jwt);
        dispatch(setToken(res.data.jwt));
        // al();
        router.replace("/admin/board");
      })
      .catch(function (error) {
        if (error.response) {
          // err(error.response);
          console.log(error.response);
        }
      });
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(submit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register}
                helperText={errors.email?.message || " "}
                error={!!errors.email} //!! เช็ค true || false
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
                helperText={errors.password?.message || " "}
                error={!!errors.password} //!! เช็ค true || false
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
