import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    token: "",
    user: null,
    darkMode: false,
    category: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (state.token && state.token.length > 0) {
        localStorage.setItem("jwt", state.token);
      } else {
        localStorage.removeItem("jwt");
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAll: (state, action) => {
      (state.user = null), (state.token = "");
      localStorage.removeItem("jwt");
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", state.darkMode);
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setToken, setUser, resetAll, setDarkMode, setCategory } =
  sessionSlice.actions;

export default sessionSlice.reducer;
