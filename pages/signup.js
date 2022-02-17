import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultLayout from "@/components/layouts/Default";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios.config";
import Swal from "sweetalert2";
import { green, red } from "@mui/material/colors";
import router from "next/router";

function err(_error) {
  const index = _error.data.errors.email[0];
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${index}`,
  });
}

function al() {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: "success",
    title: "Signed in successfully",
  }).then(() => {
    router.push(`/`, undefined, { shallow: true });
  });
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);

  const submit = async (response, event) => {
    response.json().then(async (res) => {
      const body = JSON.stringify({
        user: {
          f_name: event.firstName,
          l_name: event.lastName,
          email: event.email,
          password: event.password,
          confirmpassword: event.confirmpassword,
          user_profile_img: `/user_profile/${res.files.file.originalFilename}`,
        },
      });
      await axios
        .post("/api/v1/user/sign_up", body)
        .then((res) => {
          // console.log(res.data);
          al();
        })
        .catch(function (error) {
          if (error.response) {
            // console.log(error.response);
            err(error.response);
          }
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    });
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password must contain letters[a-zA-Z]")
        .required(),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required(),
    }),
  });

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      let i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/upload/user_profile", {
      method: "POST",
      body,
    });
    submit(response, event);
  };

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(uploadToServer)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={register}
                  helperText={errors.firstName?.message || " "}
                  error={!!errors.firstName} //!! เช็ค true || false
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  inputRef={register}
                  helperText={errors.lastName?.message || " "}
                  error={!!errors.lastName} //!! เช็ค true || false
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={register}
                  helperText={errors.email?.message || " "}
                  error={!!errors.email} //!! เช็ค true || false
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={register}
                  helperText={errors.password?.message || " "}
                  error={!!errors.password} //!! เช็ค true || false
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="ConfirmPassword"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  inputRef={register}
                  helperText={errors.confirmpassword?.message || " "}
                  error={!!errors.confirmpassword} //!! เช็ค true || false
                />
              </Grid>

              <Grid item xs={6}>
                <Button variant="contained" component="label">
                  Upload Profile
                  <input type="file" hidden onChange={uploadToClient} />
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Avatar
                  alt="Remy Sharp"
                  src={image == null ? null : URL.createObjectURL(image)}
                  sx={{ bgcolor: image == null ? red[500] : green[500] }}
                  aria-label="recipe"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </DefaultLayout>
  );
}
