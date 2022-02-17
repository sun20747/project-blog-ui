import React, { useState, useEffect } from "react";
import styles from "./Default.module.css";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
// import { } from "@mui/material";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, setToken } from "@/lib/store/session";

export default function Root({ children }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.session.darkMode);
  useEffect(() => {
    const localStorageDarkMode =
      localStorage.getItem("darkMode") == "true" ? true : false;
    const localStorageJWT = localStorage.getItem("jwt");
    dispatch(setToken(localStorageJWT));
    dispatch(setDarkMode(localStorageDarkMode));
  }, []);

  const theme = createMuiTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#884EA0",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>{children}</div>
    </ThemeProvider>
  );
}
