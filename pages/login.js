import DefaultLayout from "@/components/layouts/Default";
import * as React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Typography,
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../axios.config";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/store/session";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

function err(_error) {
  const { error } = _error.data;
  console.log(error);
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${error}`,
  });
}

function al() {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: "success",
    title: "Signed in successfully",
  });
}

export default function Login() {
  const [chackBox, setChackBox] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onChackBox = () => {
    setChackBox(!chackBox);
  };

  const submit = async (event) => {
    const body = JSON.stringify({
      user: {
        email: event.email.toLowerCase(),
        password: event.password,
      },
    });
    await axios
      .post("/api/v1/user/sign_in", body)
      .then((res) => {
        // console.log(res.data.jwt);
        dispatch(setToken(res.data.jwt));
        al();
        router.replace("/auth/profile");
      })
      .catch(function (error) {
        if (error.response) {
          err(error.response);
          // console.log(error.response);
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
  // React.useEffect(() => {
  //   console.log(errors.checkbox?.message);
  // }, [errors]);

  // React.useEffect(() => {
  //   console.log(chackBox);
  // }, [chackBox]);

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
            Sign in
          </Typography>

          <form
            onSubmit={handleSubmit(submit)}
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              // value={"atit@gmail.com"}
              inputRef={register}
              helperText={errors.email?.message || " "}
              error={!!errors.email} //!! เช็ค true || false
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // value={"12341234"}
              inputRef={register}
              helperText={errors.password?.message || " "}
              error={!!errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </DefaultLayout>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   console.log("server");

//   // Pass data to the page via props
//   return { props: {} }
// }
